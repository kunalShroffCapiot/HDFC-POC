const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use((req, res, next) => {
  var dataJson = [
    {
      id: 1,
      stage: "landing",
      entity: [
        {
          id: 1,
          name: "landing 1",
          attributes: [
            {
              id: 1,
              name: "att 1",
              relation: []
            }
          ]
        },
        {
          id: 2,
          name: "landing 2",
          attributes: [
            {
              id: 1,
              name: "att 1",
              relation: []
            },
            {
              id: 2,
              name: "att 2",
              relation: []
            }
          ]
        }
      ]
    },
    {
      id: 2,
      stage: "staging",
      entity: [
        {
          id: 3,
          name: "staging 1",
          attributes: [
            {
              id: 1,
              name: "att 1",
              relation: [
                {
                  stage: "landing",
                  entityId: "1",
                  attributeId: "1",
                  attributeName: "att 1"
                },
                {
                  stage: "landing",
                  entity: "landing 2",
                  attributeId: "1",
                  attributeName: "att 1"
                }
              ]
            }
          ]
        },
        {
          id: 4,
          name: "staging 2",
          attributes: [
            {
              id: 1,
              name: "att 1",
              relation: []
            }
          ]
        },
        {
          id: 5,
          name: "staging 3",
          attributes: [
            {
              id: 1,
              name: "att 1",
              relation: []
            },
            {
              id: 2,
              name: "att 2",
              relation: []
            },
            {
              id: 3,
              name: "att 3",
              relation: [
                {
                  stage: "landing",
                  entity: "landing 2",
                  attributeId: "3",
                  attributeName: "att 3"
                }
              ]
            }
          ]
        },
        {
          id: 6,
          name: "staging 4",
          attributes: [
            {
              id: 1,
              name: "att 1",
              relation: []
            }
          ]
        },
      ]
    },
    {
      id: 3,
      stage: "sor",
      entity: [
        {
          id: 7,
          name: "sor 7",
          attributes: [
            {
              id: 1,
              name: "att 1",
              relation: [
                {
                  stage: "staging",
                  entity: "staging 3",
                  attributeId: "1",
                  attributeName: "att 1"
                },
                {
                  stage: "staging",
                  entity: "staging 4",
                  attributeId: "1",
                  attributeName: "att 1"
                },
                {
                  stage: "staging",
                  entity: "staging 5",
                  attributeId: "1",
                  attributeName: "att 1"
                },
                {
                  stage: "staging",
                  entity: "staging 5",
                  attributeId: "2",
                  attributeName: "att 2"
                },
                {
                  stage: "staging",
                  entity: "staging 5",
                  attributeId: "3",
                  attributeName: "att 3"
                },
                {
                  stage: "staging",
                  entity: "staging 6",
                  attributeId: "1",
                  attributeName: "att 1"
                },
                {
                  stage: "mart",
                  entity: "mart 8",
                  attributeId: "1",
                  attributeName: "att 1"
                },
                {
                  stage: "mart",
                  entity: "mart 8",
                  attributeId: "2",
                  attributeName: "att 2"
                },
                {
                  stage: "mart",
                  entity: "mart 9",
                  attributeId: "1",
                  attributeName: "att 1"
                },
                {
                  stage: "mart",
                  entity: "mart 10",
                  attributeId: "1",
                  attributeName: "att 1"
                },
                {
                  stage: "mart",
                  entity: "mart 11",
                  attributeId: "1",
                  attributeName: "att 1"
                },
                {
                  stage: "mart",
                  entity: "mart 11",
                  attributeId: "2",
                  attributeName: "att 2"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 4,
      stage: "mart",
      entity: [
        {
          id: 8,
          name: "mart 1",
          attributes: [
            {
              id: 1,
              name: "att 1",
              relation: []
            },
            {
              id: 2,
              name: "att 2",
              relation: []
            }          ]
        },
        {
          id: 9,
          name: "mart 2",
          attributes: [
            {
              id: 1,
              name: "att 1",
              relation: []
            }
          ]
        },
        {
          id: 10,
          name: "mart 3",
          attributes: [
            {
              id: 1,
              name: "att 1",
              relation: []
            }
          ]
        },
        {
          id: 11,
          name: "mart 4",
          attributes: [
            {
              id: 1,
              name: "att 1",
              relation: []
            },
            {
              id: 2,
              name: "att 2",
              relation: []
            }
          ]
        }
      ]
    }
  ];

  res.status(200).json(dataJson);
  next();
});

module.exports = app;
