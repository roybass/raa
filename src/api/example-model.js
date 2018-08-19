export default {
  data: [
    {
      "title": "Band",
      "resourceName": "band",
      "endpoint": "/band",
      "fields": [
        {
          "name": "id",
          "label": "Id",
          "type": "Number",
          "readOnly": true
        },
        {
          "name": "name",
          "label": "Name",
          "type": "String",
          "required": true
        },
        {
          "name" : "bio",
          "label" : "Bio",
          "type" : "Text",
          "placeholder" : "Enter band biography here"
        },
        {
          "name": "members",
          "label": "Members",
          "type": "List",
          "fields": [
            {
              "name": "name",
              "label": "Name",
              "type": "String",
              "required": true
            },
            {
              "name": "part",
              "label": "Part",
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
          "label": "Id",
          "type": "Number",
          "readOnly": true
        },
        {
          "name": "name",
          "label": "Name",
          "type": "String",
          "required": true
        },
        {
          "name": "band",
          "label": "Band",
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
