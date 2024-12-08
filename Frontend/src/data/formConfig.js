// formConfig.js
export const lcFormSteps = [
  {
    title: "Application Information",
    description: "Upload the necessary documents to complete your application.",
    fields: [
      { label: "Branch Name", type: "select", options: ["Branch 1", "Branch 2"], required: true,gridColumn: "col-span-6"  },
      { label: "Date", type: "date", required: true,gridColumn: "col-span-6"  },
      {
        label: "Mode of Transmission",
        type: "radio",
        options: ["Mail", "Swift/Telex", "Brief Cable details by mail"],
        required: true,
        gridColumn: "col-span-12" ,
        tooltip: "Specify who will bear the charges.",

      },
    ],
  },
  {
    title: "Letter of Credit (LC) Details",
    description: "Provide LC details like number and amount.",
    fields: [
      { label: "Expiry Date of DC", type: "date", required: true,gridColumn: "col-span-5"  },
      { label: "Expiry Location of DC", type: "text", required: true,gridColumn: "col-span-5"  },
     
      {
        label: "Presentation Period",
        type: "counter",
        required: true
        ,gridColumn: "col-span-2" 
      },
      {
        label: "Charges",
        type: "toggle",
        options: ["Applicant’s Account", "Beneficiary’s Account"],
        required: true,
        gridColumn: "col-span-5", 
      },
      {
        label: "Confirmation Instruction",
        type: "radio",
        options: ["Confirm", "May Add", "Without"],
        required: true
        ,gridColumn: "col-span-7" 
      },
    ],
  },
  {
    title: "Applicant Information",
    description: "Fill in personal or business details for verification.",
    fields: [
      { label: "Applicant’s Name", type: "text", placeholder: "Enter Applicant’s Name", required: true,gridColumn: "col-span-12" },
      { label: "Applicant’s Address", type: "text", placeholder: "Enter Applicant’s Address", required: true,gridColumn: "col-span-12" // Full width
      },
      { label: "Export-Import (EXIM) Code", type: "number", required: true,gridColumn: "col-span-12"  },
    ],
  },
];
