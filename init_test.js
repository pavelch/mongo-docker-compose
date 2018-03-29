#!/usr/bin/env bash

//docker-compose exec  mongocfg1 mongo
rs.initiate(
  {
    _id: "configserver",
    configsvr: true,
    members: [
      { _id : 0, host : "mongocfg1:27017" },
      { _id : 1, host : "mongocfg2:27017" },
      { _id : 2, host : "mongocfg3:27017" }
    ]
  }
)
//docker-compose exec mongors1n1 mongo
rs.initiate(
  {
    _id : "mongors1",
    members: [
      { _id : 0, host : "mongors1n1:27017" },
      { _id : 1, host : "mongors1n2:27017" },
      { _id : 2, host : "mongors1n3:27017" }
    ]
  }
)
//docker-compose exec mongors2n1 mongo
rs.initiate(
  {
    _id : "mongors2",
    members: [
      { _id : 0, host : "mongors2n1:27017" },
      { _id : 1, host : "mongors2n2:27017" },
      { _id : 2, host : "mongors2n3:27017" }
    ]
  }
)
//docker-compose exec  mongos1 mongo
sh.addShard( "mongors1/mongors1n1:27017")
sh.addShard( "mongors2/mongors2n1:27017")