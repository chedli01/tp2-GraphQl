export const Query={
    hello:(parent:any,args:any,context:any,info:any)=> `hello ${args.name}`,
    getCvs:(parent:any,args:any,context:any,info:any)=>{

        return context.db.cvs

    },
    getCv : (parent:any,args:any,context:any,info:any) =>{
        return context.db.cvs.find((cv:any)=>cv.id==args.id)

    }
}