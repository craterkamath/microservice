# Self-Less-Acts

[![forthebadge made-with-python](http://ForTheBadge.com/images/badges/made-with-python.svg)](https://www.python.org/)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)
[![ForTheBadge built-by-developers](http://ForTheBadge.com/images/badges/built-by-developers.svg)](https://github.com/craterkamath)

All the Docker images used in the system is made available at: [Docker Hub](<https://hub.docker.com/u/craterkamath>)

A photo sharing web app being hosted on AWS Cloud.

SelfieLessActs app is used to store information about anything that is good for the society that we observe.

Examples of such acts could be
- Picking up a piece of garbage and dumping it in a garbage can
- Road getting laid in your area
- Someone helping a blind man cross the road.
- You helping your mother at home in the kitchen.

The SelfLessActs application will allow users of the application to upload image of the act with a small caption and categories. A user of the application will be presented with a screen that,
- Shows them lists of categories on which Acts have been shared. An act is a combination of an image and a caption for that image.
- Allows them to select to a topic.
- On selection, they will be shown all Acts in a category sorted in reverse chronological order (latest image first).
- Upvote a particular Act.
- Upload an Act.
- Delete an Act.

## Tools and Packages Used
- **Flask && Flask-CORS** - to implement server side API endpoints.
- **Docker** - Containarization and Scalability.
- **HTML5 Stack** - To implement Client's Web App.
- **Rest-API** - Interaction between microservices.

## Steps to install required libraries
```$ cd server```

```$ sudo apt install python3-pip```

```$ pip install -r requirements.txt```

## Steps to build any project from the list of projects/microservices
```$ cd <version>/```

```$ python app.py```

Now monolithic REST service is being split up into two microservices - one catering to the user management, and another catering to the act management. These two microservices is being started in separate docker containers, running on one AWS instance. The microservices will talk to each other via their respective REST interfaces.

## Steps to build docker images and publish it into docker_hub repository
``` $ cd docker/```

``` $ docker build -t Dockerfile .```

``` $ docker tag <project_name> <dockerID>/<project_name>:latest```

``` $ docker push <dockerID>/<project_name>:latest```

## Run all the containers as daemon process 

``` $  chmod +x start_daemon.sh```

```$ ./start_daemon.sh```

## Kill all the daemon processes

```$ chmod +x kill_all.sh```

```$ ./kill_all.sh```

## Steps to run docker container from remote repository  
``` $ docker run -p <port_no>:80  -it <dockerID>/<project_name>:latest```

## Steps to run docker container from local repository
``` $ docker run -p <port_no>:80 -it <project_name>```

## Loadbalancer Set-up

```To users instance: For path /api/v1/users```

```To acts instance: For all requests``` 

## License

This project is made available under the [MIT License](http://www.opensource.org/licenses/mit-license.php).

[![ForTheBadge built-with-swag](http://ForTheBadge.com/images/badges/built-with-swag.svg)](https://github.com/craterkamath)