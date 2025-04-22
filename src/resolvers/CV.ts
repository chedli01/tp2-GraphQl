export const CV ={
    owner : (parent:any,args:any,context:any,info:any)=>{
        return context.db.users.find((user:any)=>user.id==parent.owner)
    },
    skills: (parent:any,args:any,context:any,info:any)=>{
        const cvId = parent.id;
    const skillIds = context.db.cvSkills
      .filter((cs: any) => cs.cvId === cvId)
      .map((cs: any) => cs.skillId);

    return context.db.skills.filter((skill: any) =>
      skillIds.includes(skill.id)
    );
    },
}