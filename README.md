# litterAI API

### Register User

This endpoint will create a user document and a photo category document which stores the value of each category of trash determined by the AI based on the photo uploaded by the user.

**POST** `/register`

JSON Request body should follow

```
{
    "username": string,
    "email": string,
    "password": string,
    "firstName": string,
    "lastName": string,
    "zipCode": string
}
```

<details>
<summary>Response</summary>

```
{
    "userId": string,
    "username": string,
    "firstName": string,
    "lastName": string,
    "zipCode": string,
    "token": string
}
```

</details>

### Login

**POST** `/login`

JSON Request body should follow

```
{
	"username": string,
	"password": string
}
```

<details>
<summary>Response</summary>

```
{
    "username": string,
	"email": string,
	"firstName": string,
	"lastName": string,
	"token": string,
}
```

</details>

JSON Request body should follow

### Add Photo info

**POST** `/photoInfo`

Include user's JWT in an authorization header

`Authorization: Bearer <token>`

JSON Request body should follow

```
{
    "category": string
}
```
