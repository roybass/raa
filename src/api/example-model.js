export default {
  data: [
    {
      "title": "Band",
      "resourceName": "band",
      "endpoint": "/band",
      "fields": [
        {
          "name": "id",
          "type": "Number",
          "readOnly": true
        },
        {
          "name": "name",
          "type": "String",
          "required": true
        },
        {
          "name" : "bio",
          "label" : "Biography",
          "type" : "Text",
          "placeholder" : "Enter band biography here"
        },
        {
          "name" : "active",
          "type" : "Boolean",
          "defaultValue" : true
        },
        {
          "name": "members",
          "type": "List",
          "fields": [
            {
              "name": "name",
              "type": "String",
              "required": true
            },
            {
              "name": "part",
              "type": "Select",
              "required": true,
              "choices": ["Vocals", "Drums", "Bass", "Guitar", "Keyboard", "Violin"]
            }
          ]
        },
        {
          "label" : "Albums",
          "type": "ReferenceMany",
          "reference" : "album",
          "target" : "band",
          "display" : {
            "name": "name",
            "type": "Chip"
          }
        }
      ]
    },
    {
      "title": "Album",
      "resourceName": "album",
      "endpoint": "/album",
      "fields": [
        {
          "name": "id",
          "type": "Number",
          "readOnly": true
        },
        {
          "name": "name",
          "type": "String",
          "required": true
        },
        {
          "name": "band",
          "type": "Reference",
          "reference": "band",
          "display": {
            "name": "name",
            "type": "Select",
            "optionText": "name"
          }
        },
        {
          "name": "publishDate",
          "label": "Publish Date",
          "type": "Date"
        }
      ]
    }
  ]
};
