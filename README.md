# level-up-api
The api for the Level Up 3.0 event.


## Local Setup
- Download and Setup [PostgreSQL](https://www.postgresql.org/download/) on your machine
- Make sure you have [NodeJs](https://nodejs.org/en/download/package-manager) installed
    - It is recommended to use [nvm](https://github.com/nvm-sh/nvm) to manage you node versions
    - This setup is tested using node v22.9.0

## Documentation

### **GET** `/api/registrations`
- Retrieves all submitted registrations.

### **GET** `/api/health`
- Returns `{good}`.

### **POST** `/api/registrations`
- Sends a write request of new registration.
- Request body example in JSON:
    ```json
    {
        "name": "doggie",
        "phone": "201234567890",
        "email": "example@domain.com",
        "year": 1,
        "spec": 1,
        "competition": 2,
         "teamName": "Eagles",
         "reason": "I love competitions",
        "experience": "I'm an award winner programmer",
        "expectations": "It will be awesome",
        "comments": "lovely-looking form"
    }
    ```
- **Note that** if the user is attending (not participating), the participation property should be (undefined | null | false).

### **PUT** `/api/registrations/:id`
- Sends an update request of a registration with given ID.
- Request body same as creation request.

### **DELETE** `/api/registrations/:id`
- Sends a deletion request of a registration with given ID.
