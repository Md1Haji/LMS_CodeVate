# MongoDB Schema

Database: `lms_platform`. All models live in `backend/src/models/`.

## Collections

### `users`
One collection for every role — differentiated by `role`, not by separate
tables. This is what makes a single auth system possible.

| Field | Type | Notes |
|---|---|---|
| name, email, password | String | password is bcrypt-hashed, `select:false` by default |
| role | enum: admin / instructor / tutor / student | drives authorization + dashboard routing |
| isActive | Boolean | admin can deactivate without deleting |
| profile | Object | role-specific extras: bio, subjects, rating (instructor/tutor), grade (student) |
| achievements | [ObjectId → achievements] | badges earned by this user |

### `courses`
| Field | Type | Notes |
|---|---|---|
| title, slug, description, category, level, price | — | |
| instructor | ObjectId → users | owner, must have role `instructor` |
| tutors | [ObjectId → users] | supporting staff, role `tutor` |
| modules | [{ title, lessons: [{ title, contentUrl, durationMinutes }] }] | embedded — read together with the course, so no join needed |
| status | enum: draft / published / archived | |
| ratingAverage, ratingCount | Number | denormalized from `reviews` for fast reads |

### `enrollments`
Join collection between a student and a course.

| Field | Type | Notes |
|---|---|---|
| student | ObjectId → users | |
| course | ObjectId → users | |
| progressPercent | Number 0–100 | |
| status | enum: active / completed / dropped | |
| Unique index | (student, course) | prevents duplicate enrollment |

### `assignments`
| Field | Type | Notes |
|---|---|---|
| course | ObjectId → courses | |
| createdBy | ObjectId → users | instructor or tutor |
| title, description, dueDate, maxScore | — | |

### `submissions`
| Field | Type | Notes |
|---|---|---|
| assignment | ObjectId → assignments | |
| student | ObjectId → users | |
| fileUrl, submittedAt | — | |
| score, feedback, gradedBy | — | set by instructor/tutor |
| status | enum: submitted / graded / late | |
| Unique index | (assignment, student) | one submission per student per assignment |

### `reviews`
| Field | Type | Notes |
|---|---|---|
| course | ObjectId → courses | |
| student | ObjectId → users | |
| rating (1–5), comment | — | |
| Unique index | (course, student) | one review per student per course |

### `achievements`
Powers the public landing page's achievements section and per-user badges.

| Field | Type | Notes |
|---|---|---|
| title, description, iconUrl | — | |
| category | enum: platform / student / instructor / tutor | |
| metricValue | String | e.g. "12,400+ active learners" |
| displayOnLanding | Boolean | landing page queries `{ displayOnLanding: true }` sorted by `displayOrder` |

## Why these six collections and not more

- **Embedding vs referencing:** course `modules`/`lessons` are embedded
  (always read with the course, rarely queried independently). Everything
  else that's queried on its own or grows unbounded (submissions, reviews,
  enrollments) is a separate collection with a reference.
- **Indexes:** compound unique indexes on `(student, course)` and
  `(assignment, student)` enforce "one enrollment" / "one submission" at the
  database level instead of relying on application code.
- **Denormalized rating:** `course.ratingAverage`/`ratingCount` are updated
  whenever a review is created, so listing/browsing courses never has to
  aggregate `reviews` on every request.
