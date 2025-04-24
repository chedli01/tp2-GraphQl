
export const db = {
    users : [
        { id: 1, name: "aymen", email: "aymen@gmail.com", role: "USER" },
        { id: 2, name: "ahmed", email: "ahmed@gmail.com", role: "USER" },
        { id: 3, name: "sami", email: "samsoum@hotmail.com", role: "USER" },
      ],
    cvs : [
        { id: 1, name: "Frontend", age: 41, job: "Senior Eng", owner: 1 },
        { id: 2, name: "Backend", age: 30, job: "Freelancer", owner: 2 },
        { id: 3, name: "FullStack", age: 25, job: "Freelancer", owner: 3 },
      ],
    skills: [
        { id: 1, designation: 'Node.js' },
        { id: 2, designation: 'GraphQL' },
        { id: 3, designation: 'React' },
        { id: 4, designation: 'TypeScript' },
        { id: 5, designation: 'Python' },
        { id: 6, designation: 'Flask' },
        { id: 7, designation: 'Ruby on Rails' },
        { id: 8, designation: 'Java' },
      ],
    cvSkills:  [
        { cvId: 1, skillId: 1 },
        { cvId: 1, skillId: 2 },
        { cvId: 1, skillId: 3 },
        { cvId: 2, skillId: 4 },
        { cvId: 2, skillId: 5 },
        { cvId: 3, skillId: 6 },
        { cvId: 3, skillId: 7 },
        { cvId: 3, skillId: 8 },
      ],
    
}
