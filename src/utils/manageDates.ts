const obtainAge=(birthday:string|Date)=>{

    const hoy=new Date()
    const date=new Date(birthday)
        
    let years=date.getFullYear()-date.getFullYear()
    const months=date.getMonth()-hoy.getMonth()
    const day=date.getDay()-hoy.getDay()

    if(months<=0 && day<0)years--

    return years
}

export {obtainAge}