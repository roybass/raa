const DyplomaModel = {
  authentication : {
    url: "http://dyploma.outbrain.com:8080/DyPloMa/auth"
  },
  data: [
    {
      title: "Service",
      resourceName: "service",
      endpoint: "http://dyploma.outbrain.com:8080/DyPloMa/api/v1/services",
      customEndpoints: {
        baseUrl : "http://dyploma.outbrain.com:8080/DyPloMa/api/v1",
        list: { url: "/services/find/limit/{{limit}}/offset/{{offset}}" },
        get: { url: "/services/{{id}}", method: "GET" },
        create: { url: "/services/", method: "POST" },
        update: { url: "/services/", method: "PUT" },
        getBy: {
          name: { url: "/services/name/like/{{name}}" },
          owner: { url: "/services/owner/{{owner}}" }
        }
      },
      fields: [
        {
          name: "id",
          type: "Number",
          readOnly: true
        },
        {
          name: "name",
          type: "String",
          required: true
        },
        {
          name: "owner",
          type: "String",
          required: true
        },
        {
          name: "serviceType",
          type: "Select",
          required: true,
          choices: ["ob1k", "sage", "zemanta"]
        },
        {
          name: "external",
          type: "Boolean",
          defaultValue: false
        },
        {
          name: "antiAffinity",
          type: "Boolean",
          defaultValue: false
        },
        {
          name: "externalPort",
          label: "External Port",
          type: "Number",
          defaultValue: 0
        },
        {
          name: "creationTimestamp",
          type: "Date",
          readOnly: true
        },
        {
          name: "deployments",
          label: "Deployments",
          type: "ReferenceMany",
          reference: "deployment",
          readOnly: true,
          target: "serviceId",
          display: {
            name: "name",
            type: "Chip"
          }
        }
      ]
    },
    {
      title: "Deployment",
      resourceName: "deployment",
      endpoint: "http://dyploma.outbrain.com:8080/DyPloMa/api/v1/deployments",
      customEndpoints: {
        list: { url: "http://dyploma.outbrain.com:8080/DyPloMa/api/v1/deployments/find/limit/{{limit}}/offset/{{offset}}" },
        get: { url: "http://dyploma.outbrain.com:8080/DyPloMa/api/v1/deployments/{{id}}", method: "GET" },
        create: { url: "http://dyploma.outbrain.com:8080/DyPloMa/api/v1/deployments/", method: "POST" },
        update: { url: "http://dyploma.outbrain.com:8080/DyPloMa/api/v1/deployments/", method: "PUT" },
        getBy: {
          serviceId: { url: "http://dyploma.outbrain.com:8080/DyPloMa/api/v1/deployments/service/{{id}}" }
        }
      },
      fields: [
        {
          name: "id",
          type: "Number",
          readOnly: true
        },
        {
          name: "name",
          type: "String",
          required: true
        },
        {
          name: "extraTag",
          type: "String"
        },
        {
          name: "external",
          type: "Boolean",
          defaultValue: false
        },
        {
          name: "creationTimestamp",
          type: "Date",
          readOnly: true
        },
        {
          label: "Tags",
          name: "serviceTags",
          type: "String",
          hidden: true
        },
        {
          name: "serviceId",
          type: "Reference",
          reference: "service",
          display: {
            name: "name",
            type: "Select",
            optionText: "name"
          }
        }
      ]
    }
  ]
};


const BandsModel = {
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
          "name": "bio",
          "label": "Biography",
          "type": "Text",
          "placeholder": "Enter band biography here"
        },
        {
          "name": "active",
          "type": "Boolean",
          "defaultValue": true
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
          "label": "Albums",
          "type": "ReferenceMany",
          "reference": "album",
          "target": "band",
          "display": {
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

export { BandsModel, DyplomaModel }

