const mongoose = require('mongoose')
const {Schema, model} = mongoose;

const jobSchema = Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Use ObjectId and reference the User model
    company: { type: String, required: true },
    position: { type: String, required: true },
    location: { type: String, required: true },
    jobType: { type: String, required: true, enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'] }, // Add enum for job types
    jobStatus: { type: String, required: true, enum: ['Applied', 'Interviewing', 'Offer', 'Rejected', 'Closed'] }, // Add enum for job status
    applicationSource: { type: String },
    applicationURL: { type: String },
    contactEmail: { type: String },
    contactPhone: { type: String },
    jobDescription: { type: String },
    appliedDate: { type: Date, default: Date.now }, // Add application date, default to now
    followUpDate: { type: Date }, // Use Date type for follow-up
    notes: { type: String },
    salaryExpectation: { type: Number }, // Use Number type for salary
    resume: { type: String, required: true }, // cloud URL 
    links: [{ // Array of objects for links, portal we applied, where we can check the status.
        url: { type: String, required: true },
        description: { type: String }
    }],
    interviewDetails: [{ // Array of objects for multiple interview details
        date: { type: Date },
        type: { type: String, enum: ['Phone', 'Video', 'In-Person'] },
        interviewer: { type: String },
        notes: { type: String }
    }],
    offerDetails: { // Object for offer details
        date: { type: Date },
        salary: { type: Number },
        benefits: { type: String },
        deadline: { type: Date },
        status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'] }
    },
    stage: { type: String, enum: ['Application', 'Phone Screen', 'Technical Interview', 'HR Interview', 'Offer', 'Rejected'], default: 'Application' }, // Current stage in the application process
    lastUpdated: { type: Date, default: Date.now } // Timestamp for last update
});

module.exports = model('job', jobSchema);
