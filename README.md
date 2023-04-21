# project setup

1. install packages

```sh
yarn
```

2. install extensiom

   - **eslint**
   - **prettier**

3. config IDE
   - Editor: Default Formatter (prettier)

# start

1. dev

```sh
yarn dev
```

2. start local

```sh
yarn start
```

3. docker

```sh
docker-compose up
```

# create mongo replica set
```sh
openssl rand -base64 741 > ./mongodb/primary/keyfile
chmod 600 ./mongodb/primary/keyfile   

openssl rand -base64 741 > ./mongodb/secondary1/keyfile
chmod 600 ./mongodb/secondary1/keyfile   

openssl rand -base64 741 > ./mongodb/secondary2/keyfile
chmod 600 ./mongodb/secondary2/keyfile   
```

```sh
docker-compose exec mongodb-primary mongosh
```

```sh
var config = {
    "_id": "rs0",
    "version": 1,
    "members": [
        {
            "_id": 1,
            "host": "mongodb-primary:27017",
            "priority": 1
        }
    ]
};

rs.initiate(config, { force: true });
rs.add("mongodb-secondary-1:27017")
rs.add("mongodb-secondary-2:27017")
rs.status();
```