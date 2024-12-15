export const lcFormSteps = [
  
  {
    title: "Application Information",
    description: "Upload the necessary documents to complete your application.",
    fields: [
      {
        label: "Branch Name",
        type: "select",
        options: ["Branch 1", "Branch 2"],
        required: true,
        gridColumn: "col-span-6",
      },
      {
        label: "Date",
        type: "date",
        required: true,
        gridColumn: "col-span-6",
      },
      {
        label: "Mode of Transmission",
        type: "radio",
        options: ["Mail", "Swift/Telex", "Brief Cable details by mail"],
        required: true,
        gridColumn: "col-span-12",
        tooltip: "Specify who will bear the charges.",
      },
    ],
  },
  {
    title: "Letter of Credit (LC) Details",
    description: "Provide LC details like number and amount.",
    heading: "(31D) Date and Place of Expiry of DC: ",
    tooltip: "Specify the date and location where the document will expire.",
    fields: [
      {
        label: "Expiry Date of DC",
        type: "date",
        required: true,
        gridColumn: "col-span-5",
      },
      {
        label: "Expiry Location of DC",
        type: "text",
        required: true,
        gridColumn: "col-span-5",
      },
      {
        label: "Presentation Period",
        type: "counter",
        required: true,
        gridColumn: "col-span-2",
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
        required: true,
        gridColumn: "col-span-7",
      },
    ],
  },
  {
    title: "Applicant Information",
    description: "Fill in personal or business details for verification.",
    subHeading: "Additional Instructions",
    subHeadingTooltip: "Follow the steps carefully to avoid errors.",
    headingPosition: "center",
    fields: [
      {
        label: "Applicant’s Name",
        type: "text",
        placeholder: "Enter Applicant’s Name",
        gridColumn: "col-span-4",
      },
      {
        label: "Applicant’s Address",
        type: "text",
        placeholder: "Enter Applicant’s Address",
        gridColumn: "col-span-4",
      },
      {
        label: "Export-Import (EXIM) Code",
        type: "text",
        placeholder: "Enter EXIM Code",
        gridColumn: "col-span-4",
      },
    ],
    subSections: [
      {
        heading: "(57a) - Advise through Bank",
        tooltip: "Provide the advising bank details.",
        headingPosition: "top",
        fields: [
          {
            label: "Bank Name",
            type: "text",
            placeholder: "Enter Bank Name",
            gridColumn: "col-span-4",
          },
          {
            label: "SWIFT/BIC Code",
            type: "text",
            placeholder: "Enter SWIFT/BIC Code",
            gridColumn: "col-span-4",
          },
          {
            label: "IBAN",
            type: "text",
            placeholder: "Enter IBAN",
            gridColumn: "col-span-4",
          },
        ],
      },
    ],
  },
  {
    title: "Beneficiary Information",
    description: "Fill in personal or business details for verification.",
    fields: [
      {
        label: "Beneficiary’s Name",
        type: "text",
        placeholder: "Enter Beneficiary’s Name",
        gridColumn: "col-span-12",
      },
      {
        label: "Beneficiary’s Address",
        type: "text",
        placeholder: "Enter Beneficiary’s Address",
        gridColumn: "col-span-12",
      },
    ],
  },
  {
    title: "Credit Terms and Amounts",
    description: "Specify credit amount, currency, and tolerance limits.",
    fields: [
      {
        label: "Currency",
        type: "select",
        placeholder: "Select Currency",
        options: ["USD - United States America", "EUR - Euro", "GBP - British Pound"],
        gridColumn: "col-span-6",
      },
      {
        label: "Amount in Numbers",
        type: "number",
        placeholder: "Enter Amount",
        gridColumn: "col-span-6",
      },
    ],
    liveConversion: {
      label: "Amount in Words",
      gridColumn: "col-span-12",
    },
  },
  {
    title: "Banking Details",
    description: "Provide bank details for payment.",
    heading: "(41a) - Available with",
    fields: [
      {
        label: "Bank Name",
        type: "text",
        placeholder: "Enter Bank Name",
        gridColumn: "col-span-6",
      },
      {
        label: "SWIFT/BIC Code",
        type: "text",
        placeholder: "Enter SWIFT/BIC Code",
        gridColumn: "col-span-6",
      },
      {
        label: "IBAN",
        type: "text",
        placeholder: "Enter IBAN",
        gridColumn: "col-span-6",
      },
      {
        label: "Bank Address",
        type: "text",
        placeholder: "Enter Bank Address",
        gridColumn: "col-span-6",
      },
      {
        label: "By",
        type: "radio",
        options: ["Negotiation", "Payment", "Acceptance", "Mixed Payment", "Others"],
        gridColumn: "col-span-12",
      },
      {
        label: "(42c) Draft at",
        type: "toggle",
        options: ["Sight", "Usance"],
        gridColumn: "col-span-4",
        tooltip: "Specify where the draft is sent.",
      },
      {
        label: "Drawee",
        type: "toggle",
        options: ["Nabil Bank", "Confirmation Bank"],
        gridColumn: "col-span-4",
        tooltip: "Specify where the draft is sent.",
      },
    ],
  },
  {
    title: "Description of Goods",
    description: "Provide details about the goods being shipped.",
    fields: [
      {
        type: "table",
        columns: ["ID", "Product Name", "Price"],
        rows: 2,
        gridColumn: "col-span-12",
      },
    ],
  },
  {
    title: "Payment Term",
    description: "Provide information about shipments and transportation.",
    fields: [
      {
        label: "(44P) Partial Shipments",
        type: "toggle",
        options: ["Allowed", "Prohibited"],
        required: true,
        gridColumn: "col-span-6",
      },
      {
        label: "(43T) Transhipment",
        type: "toggle",
        options: ["Allowed", "Prohibited"],
        gridColumn: "col-span-6",
      },
      {
        label: "(44A) Shipment to be made from",
        type: "text",
        placeholder: "Enter location",
        tooltip: "Provide the location for shipment origin.",
        gridColumn: "col-span-4",
      },
      {
        label: "(44B) For transportation to",
        type: "text",
        placeholder: "Enter destination",
        tooltip: "Provide the transportation destination.",
        gridColumn: "col-span-4",
      },
      {
        label: "Via Custom office",
        type: "text",
        placeholder: "Enter custom office details",
        tooltip: "Provide the custom office details.",
        gridColumn: "col-span-4",
      },
      {
        label: "(44C) Latest shipment Date",
        type: "date",
        tooltip: "Specify the latest shipment date.",
        gridColumn: "col-span-12",
      },
    ],
  },
];
