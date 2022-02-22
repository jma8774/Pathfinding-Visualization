# Pathfinding Visualization

![badge1](https://img.shields.io/github/issues/jma8774/Pathfinding-Visualization) ![badge2](https://img.shields.io/github/license/jma8774/Pathfinding-Visualization)

For those that stumble upon this, I created this website because I struggled with visualizing what each algorithm did in my head. And if struggle like me, then perhaps this can help you a little bit. Hope you enjoy!

![picture](https://i.imgur.com/elAFPkg.png)

# Usage
It is hosted [here](https://www.jiamingma.me/Pathfinding-Visualization/) or install [Docker](http://docker.com) container to easily run this application locally.

### Install

Build the project from source:

    git clone https://github.com/jma8774/Pathfinding-Visualization.git
    cd Pathfinding-Visualization
    docker build -t pathfinding --target prod .

### Run

Run the image and go to http://localhost:3000/ to see the app:

    docker run -dp 3000:3000 pathfinding
    
### Stop

To stop the container, you can use Docker Desktop or the terminal:

    docker ps
    docker rm -f <container_id>


# Algorithms

* **Breadth-First Search:** A search algorithm that visits all nodes in the level before proceeding to the next level. It is unweighted and guarantees the shortest path.
* **Depth-First Search:** A search algorithm that finishes visiting a whole depth before looking at other depths. It is unweighted and is not efficient at pathfinding
* **Bidirectional Search:** A search algorithm that in a sense, makes use of 2 BFS. One from the source node and one from the end node. It is unweighted and guarantees the shortest path.
* **Dijkstra's Algorithm:** The most famous search algorithm, it is weighted and that is guarantees that you will get the shortest path and the path with the least cost.
* **A-Star Search:** A version of Dijkstra's algorithm that makes use of a heuristic function that predicts which path is the best to take. Arguably the best pathfinding algorithm out there.

# CI/CD Integration 
Built a CI/CD pipeline using GitHuh Actions with GitHub pages and Docker to allow for easier development.
![CICD](https://i.imgur.com/byxVqTH.png)
