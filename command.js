const { default: axios } = require("axios")

url = "https://discord.com/api/v10/applications/1081329600803651644/commands"

json = {
    "name": "Balance",
    "type": 1,
    "description": "Get ballance account",
    "options": [
        {
            "name": "Account Type",
            "description": "The type of Account",
            "type": 3,
            "required": true,
            "choices": [
                {
                    "name": "CONTRACT",
                    "value": 'CONTRACT'
                },
                {
                    "name": "SPOT",
                    "value": "SPOT"
                },
                {
                    "name": "INVESTMENT",
                    "value": "INVESTMENT"
                },
                {
                    "name": "UNIFIED",
                    "value": "UNIFIED"
                },
                {
                    "name": "FUND",
                    "value": "FUND"
                }
            ]
        },
        {
            "name": "coin",
            "description": "Specify the coin",
            "type": 3,
            "required": true
        }
    ]
}

headers = {
    "Authorization": process.env.TOKEN
}


axios.post(url,json,headers)