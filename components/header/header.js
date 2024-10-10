import React from "react";

import styles from "../header/header.module.css";
import Menu from "../menu/menu";
import LoginModal from "../login/login";
import NotificationModal from "../notification/notification";
import AuditHelper from "../../helper/audit";
import NotificationHelper from "../../helper/notification";
import MenuHelper from "../../helper/menu";
import moment from "moment";
import io from "socket.io-client";
import MenuComponent from "./menuComponent";

// const HEADER = [
//     {
//         id: 5,
//         title: "Home",
//         link: "/",
//     },
//     {
//         id: 1,
//         title: "Services",
//         open: false,
//         subMenu: [
//             {
//                 id: 1,
//                 title: "Core Banking",
//                 link: "/core-banking",
//             },
//             {
//                 id: 2,
//                 title: "Web Technology",
//                 link: "/web-technology",
//             },
//         ],
//     },
//     {
//         id: 2,
//         title: "Careers",
//         link: "/careers",
//     },
//     {
//         id: 3,
//         title: "About Us",
//         link: "/about-us",
//     },
//     {
//         id: 4,
//         title: "Contact Us",
//         link: "/contact-us",
//     },
// ];

const OPS = [
    {
        id: 1,
        title: "Timesheet Mgmt",
        open: false,
        subMenu: [
            {
                id: 3,
                title: "My Details",
                open: false,
                subMenu: [
                    {
                        id: 4,
                        title: "My Tasks",
                        link: "/employee/TsTask",
                    },
                    {
                        id: 5,
                        title: "My Timesheet",
                        link: "/employee/timesheet",
                    },
                ],
            },
            {
                id: 6,
                title: "Team Details",
                open: false,
                subMenu: [
                    {
                        id: 7,
                        title: "Deliverable Details",
                        link: "/timeMgmt/TsWbs",
                    },
                    {
                        id: 8,
                        title: "Project Details",
                        link: "/timeMgmt/TsProject",
                    },
                    {
                        id: 9,
                        title: "Epic Details",
                        link: "/timeMgmt/TsEpic",
                    },
                    {
                        id: 10,
                        title: "User Story Details",
                        link: "/timeMgmt/TsUserStory",
                    },
                    {
                        id: 11,
                        title: "Task Details",
                        link: "/timeMgmt/TsTaskOps",
                    },
                    {
                        id: 12,
                        title: "Sub-Task Details",
                        link: "/timeMgmt/TsSubTask",
                    },
                    {
                        id: 44,
                        title: "Sub - Task Dashboard",
                        link: "/timeMgmt/TsSubTaskDashboard",
                    },
                    {
                        id: 13,
                        title: "Team Timesheet",
                        link: "/timeMgmt/TsTimesheet",
                    },
                    {
                        id: 19,
                        title: "Time Mgmt Dashboard",
                        link: "/timeMgmt/TsDashboard",
                    },
                ],
            },
        ],
    },
    {
        id: 2,
        title: "SDLC Mgmt",
        open: false,
        subMenu: [
            {
                id: 20,
                title: "Client Details",
                link: "/sdlcMgmt/sdlcClient",
            },
            {
                id: 14,
                title: "Project Details",
                link: "/sdlcMgmt/sdlcProject",
            },
            {
                id: 15,
                title: "Module Details",
                link: "/sdlcMgmt/sdlcModule",
            },
            {
                id: 16,
                title: "Feature Details",
                link: "/sdlcMgmt/sdlcFeature",
            },
            {
                id: 17,
                title: "User Story Details",
                link: "/sdlcMgmt/sdlcUS",
            },
            {
                id: 18,
                title: "Acceptance Criteria Details",
                link: "/sdlcMgmt/sdlcAC",
            },
            {
                id: 21,
                title: "Bug Details",
                link: "/sdlcMgmt/sdlcBug",
            },
        ],
    },
    {
        id: 23,
        title: "Inventory Mgmt",
        open: false,
        subMenu: [
            {
                id: 24,
                title: "Assets",
                link: "/invtMgmt/imAsset",
            },
            {
                id: 25,
                title: "Asset Allocation",
                link: "/invtMgmt/imAssetAllocate",
            },
            {
                id: 26,
                title: "Asset Health Check",
                link: "/invtMgmt/imAssetHealth",
            },
            {
                id: 27,
                title: "Asset Maintenance",
                link: "/invtMgmt/imAssetMaint",
            },
            {
                id: 28,
                title: "Dashboard",
                link: "/invtMgmt/Dashboard",
            },
        ],
    },
    {
        id: 29,
        title: "Academy",
        open: false,
        subMenu: [
            {
                id: 30,
                title: "Category List",
                link: "/academy/AcCategory",
            },
            {
                id: 31,
                title: "Sub-Category List",
                link: "/academy/AcSubCategory",
            },
            {
                id: 32,
                title: "Course List",
                link: "/employee/AcCourse",
            },
            {
                id: 33,
                title: "Exam Paper Details",
                link: "/academy/AcExamPaper",
            },
            {
                id: 34,
                title: "Take Exam",
                link: "/academy/examPaper",
            },
            {
                id: 35,
                title: "Exam Score Details",
                link: "/academy/extPaper",
            },
            {
                id: 36,
                title: "Dashboard",
                link: "/academy/AcDashboard",
            },
            {
                id: 37,
                title: "Video-Materials",
                open: false,
                subMenu: [
                    {
                        id: 38,
                        title: "Avaloq Foundation (Tamil)",
                        link: "/academy/AcAvqFoundTamil",
                    },
                    {
                        id: 39,
                        title: "Avaloq Foundation (Telugu)",
                        link: "/academy/AcAvqFoundTelugu",
                    },
                ],
            },
        ],
    },
];

const HR = [
    {
        id: 1,
        title: "Timesheet Mgmt",
        open: false,
        subMenu: [
            {
                id: 3,
                title: "My Details",
                open: false,
                subMenu: [
                    {
                        id: 4,
                        title: "My Tasks",
                        link: "/employee/TsTask",
                    },
                    {
                        id: 5,
                        title: "My Timesheet",
                        link: "/employee/timesheet",
                    },
                ],
            },
            {
                id: 6,
                title: "Team Details",
                open: false,
                subMenu: [
                    {
                        id: 7,
                        title: "Deliverable Details",
                        link: "/timeMgmt/TsWbs",
                    },
                    {
                        id: 8,
                        title: "Project Details",
                        link: "/timeMgmt/TsProject",
                    },
                    {
                        id: 9,
                        title: "Epic Details",
                        link: "/timeMgmt/TsEpic",
                    },
                    {
                        id: 10,
                        title: "User Story Details",
                        link: "/timeMgmt/TsUserStory",
                    },
                    {
                        id: 11,
                        title: "Task Details",
                        link: "/timeMgmt/TsTask",
                    },
                    {
                        id: 12,
                        title: "Sub-Task Details",
                        link: "/timeMgmt/TsSubTask",
                    },
                    {
                        id: 23,
                        title: "Sub - Task Dashboard",
                        link: "/timeMgmt/TsSubTaskDashboard",
                    },
                    {
                        id: 13,
                        title: "Team Timesheet",
                        link: "/timeMgmt/TsTimesheet",
                    },
                ],
            },
        ],
    },
    {
        id: 2,
        title: "SDLC Mgmt",
        open: false,
        subMenu: [
            {
                id: 20,
                title: "Client Details",
                link: "/sdlcMgmt/sdlcClient",
            },
            {
                id: 14,
                title: "Project Details",
                link: "/sdlcMgmt/sdlcProject",
            },
            {
                id: 15,
                title: "Module Details",
                link: "/sdlcMgmt/sdlcModule",
            },
            {
                id: 16,
                title: "Feature Details",
                link: "/sdlcMgmt/sdlcFeature",
            },
            {
                id: 17,
                title: "User Story Details",
                link: "/sdlcMgmt/sdlcUS",
            },
            {
                id: 18,
                title: "Acceptance Criteria Details",
                link: "/sdlcMgmt/sdlcAC",
            },
            {
                id: 21,
                title: "Bug Details",
                link: "/sdlcMgmt/sdlcBug",
            },
        ],
    },
];

const INF = [
    {
        id: 6,
        title: "Inventory Management",
        open: false,
        subMenu: [
            {
                id: 7,
                title: "Asset Details",
                link: "/invtMgmt/imAsset",
            },
            {
                id: 8,
                title: "Asset Allocation Details",
                // link: "/academy/AcSubCategory",
            },
            {
                id: 9,
                title: "Asset Health Check",
                // link: "/employee/AcCourse",
            },
            {
                id: 10,
                title: "Asset Maintenance",
                // link: "/employee/examPaper",
            },
        ],
    },
];

const PM = [
    {
        id: 1,
        title: "Timesheet Mgmt",
        open: false,
        subMenu: [
            {
                id: 7,
                title: "Deliverable Details",
                link: "/timeMgmt/TsWbs",
            },
            {
                id: 8,
                title: "Project Details",
                link: "/timeMgmt/TsProject",
            },
            {
                id: 9,
                title: "Epic Details",
                link: "/timeMgmt/TsEpic",
            },
            {
                id: 10,
                title: "User Story Details",
                link: "/timeMgmt/TsUserStory",
            },
            {
                id: 11,
                title: "Task Details",
                link: "/timeMgmt/TsTaskOps",
                //          link: "/timeMgmt/TsTask",
            },
            {
                id: 12,
                title: "Sub-Task Details",
                link: "/timeMgmt/TsSubTask",
            },
            {
                id: 21,
                title: "Sub - Task Dashboard",
                link: "/timeMgmt/TsSubTaskDashboard",
            },
            {
                id: 13,
                title: "Team Timesheet",
                link: "/timeMgmt/TsTimesheet",
            },
        ],
    },
    {
        id: 2,
        title: "SDLC Mgmt",
        open: false,
        subMenu: [
            {
                id: 20,
                title: "Client Details",
                link: "/sdlcMgmt/sdlcClient",
            },
            {
                id: 14,
                title: "Project Details",
                link: "/sdlcMgmt/sdlcProject",
            },
            {
                id: 15,
                title: "Module Details",
                link: "/sdlcMgmt/sdlcModule",
            },
            {
                id: 16,
                title: "Feature Details",
                link: "/sdlcMgmt/sdlcFeature",
            },
            {
                id: 17,
                title: "User Story Details",
                link: "/sdlcMgmt/sdlcUS",
            },
            {
                id: 18,
                title: "Acceptance Criteria Details",
                link: "/sdlcMgmt/sdlcAC",
            },
            {
                id: 21,
                title: "Bug Details",
                link: "/sdlcMgmt/sdlcBug",
            },
        ],
    },
];

const EVNTMGMT_TL = [
    {
        id: 1,
        title: "Initial Setup",
        open: false,
        subMenu: [
            {
                id: 2,
                title: "Project Details",
                link: "/em/emProject",
            },
            {
                id: 3,
                title: "Stall Details",
                link: "/em/emStall",
            },
            {
                id: 4,
                title: "GST Details",
                link: "/em/emGST",
            },
            {
                id: 5,
                title: "Report-1 (Project Statistics)",
                link: "/em/project-statistics",
            },
        ],

    },
    {
        id: 6,
        title: "Project Management",
        open: false,
        subMenu: [
            {
                id: 7,
                title: "Report-1 (Project Statistics)",
                link: "/em/project-statistics",
            },
        ],

    },
];

const EVNTMGMT_JN_CS = [
    {
        id: 1,
        title: "Project Management",
        open: false,
        subMenu: [
            {
                id: 2,
                title: "On-board Tenant",
                link: "/em/emOnboard",
            },
        ],
    },
];

const EVNTMGMT_SN_CS = [
    {
        id: 1,
        title: "Project Management",
        open: false,
        subMenu: [
            {
                id: 2,
                title: "Orders in my Queue",
                link: "/em/emOrderQueue",
            },
        ],
    },
];

const GUEST = [
    {
        id: 1,
        title: "Academy",
        open: false,
        subMenu: [
            {
                id: 2,
                title: "Take Exam",
                link: "/guest/examPaper",
            },
            {
                id: 3,
                title: "ScoreCard History",
                link: "/guest/ScoreCard",
            },
        ],
    },
];

const AC = [
    {
        id: 1,
        title: "Timesheet Mgmt",
        open: false,
        subMenu: [
            {
                id: 2,
                title: "My Task Details",
                link: "/timeMgmt/TsTask",
            },
            {
                id: 3,
                title: "My Timesheet Details",
                link: "/employee/timesheet",
            },
        ],
    },
    {
        id: 5,
        title: "Academy",
        open: false,
        subMenu: [
            {
                id: 6,
                title: "Category List",
                link: "/academy/AcCategory",
            },
            {
                id: 7,
                title: "Sub-Category List",
                link: "/academy/AcSubCategory",
            },
            {
                id: 8,
                title: "Course List",
                link: "/employee/AcCourse",
            },
            {
                id: 16,
                title: "Exam Paper Details",
                link: "/academy/AcExamPaper",
            },
            {
                id: 9,
                title: "Take Exam",
                link: "/academy/examPaper",
            },
            {
                id: 10,
                title: "Exam Score Details",
                link: "/academy/extPaper",
            },
            {
                id: 16,
                title: "Dashboard",
                link: "/academy/AcDashboard",
            },
            {
                id: 11,
                title: "Video-Materials",
                open: false,
                subMenu: [
                    {
                        id: 13,
                        title: "Avaloq Foundation (Tamil)",
                        link: "/academy/AcAvqFoundTamil",
                    },
                    {
                        id: 14,
                        title: "Avaloq Foundation (Telugu)",
                        link: "/academy/AcAvqFoundTelugu",
                    },
                ],
            },
        ],
    },
];

const FI = [
    {
        id: 1,
        title: "Timesheet Mgmt",
        open: false,
        subMenu: [
            {
                id: 2,
                title: "My Task Details",
                link: "/timeMgmt/TsTask",
            },
            {
                id: 3,
                title: "My Timesheet Details",
                link: "/employee/timesheet",
            },
        ],
    },
];

const PF_ADMIN = [
    {
        id: 1,
        title: "Platform Settings",
        open: false,
        subMenu: [
            {
                id: 2,
                title: "Tennant Details",
                link: "/pfmMgmt/pfTenant",
            },
            {
                id: 3,
                title: "Module Details",
                link: "/pfmMgmt/pfModule",
            },
            {
                id: 4,
                title: "Component Details",
                link: "/pfmMgmt/pfComponent",
            },
        ],
    },
];

const TNNT_ADMIN = [
    {
        id: 1,
        title: "Platform Settings",
        open: false,
        subMenu: [
            {
                id: 2,
                title: "Role User Details",
                // link: "/pfmMgmt/pfTenant",
            },
            {
                id: 3,
                title: "Role User Access",
                // link: "/pfmMgmt/pfModule",
            },
            {
                id: 4,
                title: "End User Details",
                // link: "/pfmMgmt/pfComponent",
            },
            {
                id: 5,
                title: "End User Access",
                // link: "/pfmMgmt/pfComponent",
            },
        ],
    },
    {
        id: 6,
        title: "Custom Field",
        open: false,
        link: "/tnntAdmin/customFields",
    },
];

const USER = [
    {
        id: 1,
        title: "HR Details",
        open: false,
        subMenu: [
            {
                id: 5,
                title: "My Profile",
                link: "/employee/MyProfile",
            },
        ],
    },
    {
        id: 2,
        title: "Timesheet Mgmt",
        open: false,
        subMenu: [
            {
                id: 6,
                title: "My Leave Details",
                link: "/employee/MyLeaves",
            },
            {
                id: 7,
                title: "My Tasks",
                link: "/employee/TsTask",
            },
            {
                id: 17,
                title: "Sub-Task Details",
                link: "/timeMgmt/TsSubTask",
            },

            {
                id: 8,
                title: "My Timesheet",
                link: "/employee/timesheet",
            },
        ],
    },
    {
        id: 3,
        title: "Academy",
        open: false,
        subMenu: [
            {
                id: 15,
                title: "Category List",
                link: "/academy/AcCategory",
            },
            {
                id: 16,
                title: "Sub-Category List",
                link: "/academy/AcSubCategory",
            },
            {
                id: 9,
                title: "Course List",
                link: "/employee/AcCourse",
            },
            {
                id: 10,
                title: "Take Exam",
                link: "/academy/examPaper",
            },
            {
                id: 11,
                title: "My Score Card History",
                link: "/employee/ScoreCard",
            },
            {
                id: 12,
                title: "Video-Materials",
                open: false,
                subMenu: [
                    {
                        id: 13,
                        title: "Avaloq Foundation (Tamil)",
                        link: "/academy/AcAvqFoundTamil",
                    },
                    {
                        id: 14,
                        title: "Avaloq Foundation (Telugu)",
                        link: "/academy/AcAvqFoundTelugu",
                    },
                ],
            },
        ],
    },
    {
        id: 4,
        title: "SDLC Mgmt",
        open: false,
        subMenu: [
            {
                id: 20,
                title: "Client Details",
                link: "/sdlcMgmt/sdlcClient",
            },
            {
                id: 15,
                title: "Project Details",
                link: "/sdlcMgmt/sdlcProject",
            },
            {
                id: 16,
                title: "Module Details",
                link: "/sdlcMgmt/sdlcModule",
            },
            {
                id: 17,
                title: "Feature Details",
                link: "/sdlcMgmt/sdlcFeature",
            },
            {
                id: 18,
                title: "User Story Details",
                link: "/sdlcMgmt/sdlcUS",
            },
            {
                id: 19,
                title: "Acceptance Criteria Details",
                link: "/sdlcMgmt/sdlcAC",
            },
            {
                id: 21,
                title: "Bug Details",
                link: "/sdlcMgmt/sdlcBug",
            },
        ],
    },
];

const HEADER = [
    {
        id: 2,
        title: "Products",
        open: false,
        subMenu: [
            {
                id: 1,
                link: "/erp_eventManagement",
                open: '',
                title: "Event Management",
                subMenu: null,
            },
            {
                id: 2,
                link: "/erp_travelmanagement",
                open: '',
                title: "Travel Management",
                subMenu: null,
            },
            {
                id: 3,
                link: "/erp_boutique",
                open: '',
                title: "Boutique",
                subMenu: null,
            },
            {
                id: 4,
                link: "/erp_tuition",
                open: '',
                title: "Tuition Center",
                subMenu: null,
            },
            {
                id: 5,
                link: "/erp_preschool",
                open: '',
                title: "Pre School and Daycare",
                subMenu: null,
            },
            {
                id: 6,
                link: "/erp_Ai_mentor",
                open: '',
                title: "AI Mentor Expense Tracker",
                subMenu: null,
            },
        ],
    },
    {
        id: 3,
        title: "Features",
        open: false,
        subMenu: [
            {
                id: 1,
                link: "/core-banking",
                open: '',
                title: "Core Banking",
                subMenu: null,
            },
            {
                id: 2,
                link: "/web-technology",
                open: '',
                title: "Web Technology",
                subMenu: null,
            },
        ],
    },
    {
        id: 4,
        title: "Services",
        open: false,
        subMenu: [
            {
                id: 1,
                link: "/core-banking",
                open: '',
                title: "Core Banking",
                subMenu: null,
            },
            {
                id: 2,
                link: "/web-technology",
                open: '',
                title: "Web Technology",
                subMenu: null,
            },
        ],
    },
    {
        id: 5,
        title: "Pricing",
        link: "/contact-us",
    },
    {
        id: 7,
        title: "Gallery",
        link: "/gallery",
    },
    {
        id: 8,
        title: "Academy",
        open: false,
        subMenu: [
            {
                id: 1,
                link: "/acCourse",
                open: '',
                title: "Courses & Certification",
                subMenu: null,
            },
            {
                id: 2,
                link: "/acInternship",
                open: '',
                title: "Internship",
                subMenu: null,
            },
            {
                id: 3,
                link: "/acProject",
                open: '',
                title: "College Final Year Project",
                subMenu: null,
            },
            {
                id: 4,
                link: "/acindustrialVisit",
                open: '',
                title: "Industrial Visit",
                subMenu: null,
            },
            {
                id: 5,
                link: "/acWorkshop",
                open: '',
                title: "Guest Lectures & workshop sessions",
                subMenu: null,
            },
            {
                id: 6,
                link: "/acWebinar",
                open: '',
                title: "Webinar sessions",
                subMenu: null,
            },
        ],
    },
];


export default class Header extends React.Component {
    constructor(props) {
        super(props);
        let menu = [];
        if (global.config.user_role == null) {
            menu = HEADER;
        } else if (global.config.user_role == "6") {
            menu = OPS;
        } else if (global.config.user_role == "1") {
            menu = USER;
        } else if (global.config.user_role == "9") {
            menu = GUEST;
        } else if (global.config.user_role == "3") {
            menu = PM;
        } else if (global.config.user_role == "2") {
            menu = HR;
        } else if (global.config.user_role == "5") {
            menu = FI;
        } else if (global.config.user_role == "7") {
            menu = AC;
        } else if (global.config.user_role == "10") {
            menu = EVNTMGMT_TL;
        } else if (global.config.user_role == "11") {
            menu = EVNTMGMT_JN_CS;
        } else if (global.config.user_role == "12") {
            menu = EVNTMGMT_SN_CS;
        } else if (global.config.user_role == "8") {
            menu = INF;
        } else if (global.config.user_role == "13") {
            menu = PF_ADMIN;
        } else if (global.config.user_role == "14") {
            menu = TNNT_ADMIN;
        }

        this.state = {
            loginVisibility: false,
            categoryListOpen: false,
            username: undefined,
            // menu: menu,
            menu: [],
            subscribe: [],
            notifications: [],
            notificationEditVisibility: false,
            number: 0,
            activeMenu: null,
            dropdown: false,
            tnnt_id: global.config.tnnt_id,
        };
        this.ref = React.createRef();
        // this.getNumber = this.getNumber.bind(this);
    }

    componentDidMount() {
        const username = global.localStorage.username;

        if (username != null && username !== undefined) {
            this.setState({
                username: username,
                menu: global.config.menu,
            });

            // Connect to the WebSocket server
      //      const socket = io.connect("https://api.finari.com");

        //    socket.on("connect", () => {
          //      console.log("Socket connected:", socket.id);

                // Now it's safe to:
            //    const userId = socket.id;
              //  console.log("User ID:", userId);
           //     socket.emit("authenticate", userId);

          //      socket.on("notificationCountUpdate", (data) => {
          //          console.log("New item received:", data);
          //          if (data[0].user_name === username) {
                        // Use === for strict comparison
            //            this.setState({ number: data[0].total_count });
           //         }
          //      });

            //    this.socket = socket;
           // });

           // this.CheckAlert();
        } else {
            this.setState({ menu: HEADER })
        }

        document.addEventListener('mousedown', this.handleOutsideClick);
        document.addEventListener('touchstart', this.handleOutsideClick);
        // MenuHelper.get(username)
        //     .then((data) => {
        //         this.setState({ menu: data })
        //     })
        //     .catch((err) => console.log(err));
    }

    componentWillUnmount() {
        // this.socket.disconnect();
        document.removeEventListener('mousedown', this.handleOutsideClick);
        document.removeEventListener('touchstart', this.handleOutsideClick);
    }

    handleOutsideClick = (event) => {
        const { dropdown } = this.state;
        if (
            dropdown &&
            this.ref.current &&
            !this.ref.current.contains(event.target)
        ) {
            this.setState({ dropdown: false });
        }
    };

    onMouseEnter = () => {
        if (window.innerWidth > 960) {
            this.setState({ dropdown: true });
        }
    };

    onMouseLeave = () => {
        if (window.innerWidth > 960) {
            this.setState({ dropdown: false });
        }
    };

    closeDropdown = () => {
        const { dropdown } = this.state;
        if (dropdown) {
            this.setState({ dropdown: false });
        }
    };

    CheckAlert() {

        const filter = {
            user_name: global.config.username,
            tnnt_id: global.config.tnnt_id,
            is_active: "active",
        };

        NotificationHelper.checkAlert(filter)
            .then((data) => {

                this.setState({ number: data[0].count });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    setRead() {
        const filter = {
            user_name: global.config.username,
            tnnt_id: global.config.tnnt_id,
            is_active: "active",
        };

        NotificationHelper.setRead(filter)
            .then((data) => {
                if (data.code == 200) {
                    this.CheckAlert();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    async logout() {
        const session_id = localStorage.getItem("session_id");
        // this.socket.disconnect();
        const data = {
            logoff_timestamp: moment(new Date()).format("YYYY-MM-DD  hh:mm:ss"),
            session_id: session_id,
        };

        AuditHelper.update(data)
            .then((data) => { })
            .catch((err) => console.log(err));


        localStorage.clear();
        window.location = "/";
    }

    handleMenuHover = (id) => {
        console.log("active", id)
        this.setState({ activeMenu: id });
    }

    handleMenuLeave = () => {
        this.setState({ activeMenu: null });
    }

    renderSubMenu = (subMenu) => {
        const { activeMenu } = this.state;
        console.log("active sub", activeMenu)
        if (!subMenu) return null;
        return (
            <div className={styles.dropdownContent}>
                <div className={styles.row}>
                    {subMenu.map(item => (
                        <div className={styles.column} key={item.id} onMouseEnter={() => this.handleMenuHover(item.id)}>
                            <p>{item.title} {item.subMenu && <i className="fa fa-caret-down" style={{ marginLeft: 5 }}></i>}</p>
                            {activeMenu === item.id && item.subMenu && item.subMenu.map(subItem => (
                                <a href={subItem.link} key={subItem.id}>{subItem.title}</a>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    render() {
        const {
            categoryListOpen,
            menu,
            loginVisibility,
            username,
            notificationEditVisibility,
            number,
            activeMenu,
            tnnt_id,
        } = this.state;
        return (
            <div>
                {loginVisibility && (
                    <LoginModal
                        visibility={loginVisibility}
                        setVisibility={(v) => this.setState({ loginVisibility: v })}
                    />
                )}
                {notificationEditVisibility && (
                    <NotificationModal
                        visibility={notificationEditVisibility}
                        setVisibility={(v) =>
                            this.setState({ notificationEditVisibility: v })
                        }
                    />
                )}
                <div className={styles.mainWrapper}>
                    {
                    tnnt_id == 14 ?
                     <img
                        className={styles.logoImg}
                        src={"/assets/Libra_logo.jpg"}
                        alt="Libra"
                        width={120}
                        height={120}
                        onClick={() => (window.location = "/")}
                    />:<img
                    className={styles.logoImg}
                    src={"/assets/logo.png"}
                    alt="Finari"
                    onClick={() => (window.location = "/")}
                />
                    }
                   

                    {/* <div className={styles.navbar}>
            {menu !== null &&
              menu.map((m) =>
                m.subMenu?.length >= 0 ? (
                  <div className={styles.dropdown}>
                    <div className={styles.dropbtn}>
                      {m.title}

                      {m.title != "Services" && (
                        <i
                          style={{ marginLeft: 5 }}
                          class="fa fa-caret-down"
                        ></i>
                      )}
                    </div>
                    <div className={styles.dropdownContent}>
                      <div className={styles.row}>
                        {m.subMenu.map((sm) =>
                          sm.subMenu?.length >= 0 ? (
                            <div className={styles.column}>
                              <p href={sm.link}>{sm.title}</p>
                              {sm.subMenu?.length > 0 &&
                                sm.subMenu.map((p) => (
                                  <a href={p.link}>{p.title}</a>
                                ))}
                            </div>
                          ) : (
                            <div className={styles.columnSingle}>
                              <a href={sm.link}>{sm.title}</a>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={styles.headerStyle}>
                    <a href={m.link}>{m.title}</a>
                  </div>
                )
              )}
          </div> */}

                    {/* Add Menu Nav here */}

                    <MenuComponent menu={menu} />

                    <div className={styles.navbarMenu} onMouseLeave={this.handleMenuLeave}>
                        {menu !== null &&
                            menu.map((m) =>
                                m.subMenu?.length >= 0 ? (
                                    <div
                                        className={styles.dropdown}
                                        key={m.id}
                                        onMouseEnter={() => this.handleMenuHover(m.id)}
                                    >
                                        <div className={styles.dropbtn}>
                                            {m.title}
                                            <i className="fa fa-caret-down" style={{ marginLeft: 5 }}></i>
                                        </div>
                                        {activeMenu === m.id && this.renderSubMenu(m.subMenu)}
                                    </div>
                                ) : (
                                    <div className={styles.headerStyle} key={m.id}>
                                        <a href={m.link}>{m.title}</a>
                                    </div>
                                )
                            )}
                    </div>

                    {username == undefined ? (
                        <div className={styles.signup}>
                            <div>
                                <a
                                    onClick={() =>
                                        this.setState({
                                            loginVisibility: true,
                                        })
                                    }
                                    className={styles.menuTitle}
                                >
                                    {"Sign In"}
                                </a>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.signup}>
                            <div className={styles.navbar}>
                                <div className={styles.dropdown}>
                                    <div className={`${styles.dropbtn}`}>
                                        <i
                                            class="fa fa-bell"
                                            aria-hidden="true"
                                            onClick={() => {
                                                this.setRead(),
                                                    this.setState({
                                                        notificationEditVisibility: true,
                                                    });
                                            }}
                                        ></i>
                                        {number != 0 && (
                                            <div className={styles.notiAlignment}>
                                                <div className={styles.circle}>
                                                    {number}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className={styles.dropdown}>
                                    <a className={styles.dropbtn}>
                                        {username}
                                        <i style={{ marginLeft: 8 }} class="fa fa-caret-down"></i>
                                    </a>
                                    <div
                                        className={styles.dropdownUser}
                                    // style={{ top: 20, left: -120 }}
                                    >
                                        <div className={styles.row}>
                                            <div className={styles.columnSingle}>
                                                <a
                                                    onClick={() => {
                                                        window.location = "/security-questions";
                                                    }}
                                                >
                                                    Settings
                                                </a>
                                            </div>
                                            <div className={styles.columnSingle}>
                                                <a
                                                    onClick={() => {
                                                        window.location = "/employee/changePassword";
                                                    }}
                                                >
                                                    Change Password
                                                </a>
                                            </div>
                                            <div className={styles.columnSingle}>
                                                <a onClick={() => this.logout()}>Logout</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div
                        className={styles.menuButton}
                        onClick={() =>
                            this.setState({
                                categoryListOpen: !categoryListOpen,
                            })
                        }
                    >
                        <i
                            class={`fa ${categoryListOpen ? "fa-close" : "fa-bars"}`}
                            aria-hidden="true"
                        ></i>
                    </div>
                </div>
                <Menu
                    menu={menu}
                    open={categoryListOpen}
                    setOpen={(v) => this.setState({ categoryListOpen: v })}
                />
            </div>
        );
    }
}
