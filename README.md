When the app will first run it will create a admin user with below
credentials
- email : superUser@test.com
- password : asdf1234

Endpoints:
- POST /login 
- POST /users
```
Only admin can create user
```
- GET /users
```
Only admin can get users
```
- POST /tasks
```
Create Task
Task will be added to the task list of currently logged in user
```
- GET /tasks?userId=<UserUniqueId>
```
If query parameter is not given then userId will be taken from currently logged in user
If user is admin then userId can be of any user
Is user is not admin then userId should be of currently lof=gged in user
```

- GET /tasks/:id
```
If task does not exist give error
If task exist and user is admin return result
If task exist and task is of currently logged in user return result
If task exist and user is reviewer of that task return result
else return error
```
- POST /tasks/:id/reviewers
```
Only admin can access this route
{
"userUniqueId":"" //id of user to be added as reviewer
}
Checks:
User cant becomer reviewer of its own task
```
- Delete /task/:id/reviewers
```
Only admin can access this route
{
"userUniqueId":"" //id of user to be be removed as reviewer
}
```
- PUT /task/:id/reviewers
```
Only reviewers can access this route
{
"isApproved":true || false //whether task is approved or not
}
```

- GET /tasks/assignedForReview
```
Get tasks of which the currently logged in user has to review
```
