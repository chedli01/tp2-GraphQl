
export const db = {
    users : [
        { id: "1", name: "aymen", email: "aymen@gmail.com", role: "USER" },
      ],
    cvs : [
        { id: "12345", name: "FullStack", age: 41, job: "Freelancer", owner: "1" },
      ],
    skills: [
        { id: 's1', designation: 'Node.js' },
        { id: 's2', designation: 'GraphQL' }
      ],
    cvSkills:  [
        { cvId: '12345', skillId: 's1' },
        { cvId: '12345', skillId: 's2' }
      ],
    
}
