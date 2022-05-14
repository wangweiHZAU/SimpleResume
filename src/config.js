const data = {
    header:{
    name: '王伟',
    phone: '123456',
    email: 'weiwoxinyou52321@gmail.com',
    location: '湖北武汉',
    age: 25,
    target: '前端开发',
    test: 'test'
    },sections:{
        education: [
            {
            school: "Huazhong Agricultural University",
            spanFrom: "2015.09", spanTo: "2019.06",
            major: "Bioinformatics",
            degree: "Bachelor"},
            {
            school: "Huazhong Agricultural University",
            spanFrom: "2019.09", spanTo: "2022.12",
            major: "Agricultural Information Engineering",
            degree: "Master"
            }
        ],
        professionalExperience:[
            {
            company: "Wuhan Kingsoft Office Software Co., Ltd.",
            spanFrom: "2021.06", spanTo: "2021.09",
            position: "Front-end development engineer",
            content: ""
            }
        ],
        projectExperience:[
            {
                projectName: "Spend Bill Gates' money",
                content: "Complete 'time capsule' independently (js version, react version, hooks version). Original page:https://p.timepill.net/"
            },{
                projectName: '',
                content: "Independently complete the project with blog function, use antd as the basic framework, and develop with functional programming. With user login, user registration, user personal information management, article publishing, editing, and deleting functions. The overall style of the code is restricted by the eslint specification, the format is standardized by the prettier, and the naming is corrected by the code spell checker to ensure the readability of the code. Data request uses axios, data storage uses mongodb, and user status information uses mobx hooks for management. Components are divided into public components and independent components according to their functions. Independent components ensure a single function and realize code decoupling. Restrict and check user input data, and check the back-end returned data to ensure the reliability of the code. Set redirection for all unmatched routes to ensure logical integrity."
            },{
                projectName: '',
                content: 'Cooperate to complete the "Spend Bill Gates\' Money" project, using antd as the basic framework, using less module for style modification, and using the Form and Table of antd for overall layout. As a whole, according to the changes in the front-end regal data, the back-end regal data is changed. The performance bottleneck is that the account data is stored in the memory.'
            }
        ],
        summary:[
            'Proficient in Python language, familiar with C++, javascript and typescript. Understand java, c# and other languages, and have been exposed to the .net framework. Familiar with data structure and basic algorithm, passed CET-6 during university.',
            'Served as the monitor during the undergraduate and master\'s degree period, with strong communication and coordination skills.',
            'Love technology, have a strong sense of self-management, have a clear plan for one\'s own career, and have a strong resistance to pressure.',
            'Like board games, strategy games',
            'Personal Git: https://github.com/wangweiHZAU'
        ]
}
}

// data 结构
// data = {
//     header: {name: string, age: number, ...others},
//     sections<section[]>: [{title:string, subtitle, 
//     span-from: str, span-to: str}, ...others
//     ]
// }