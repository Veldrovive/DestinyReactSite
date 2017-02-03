export const loadState = () => {
  try{
    const serializedData = localStorage.getItem('state')
    if(serializedData === null){
      return undefined
    }
    return JSON.parse(serializedData)
  }catch(err){
    throw ("Could not get localStorage state")
    return undefined
  }
}

export const saveState = (state) => {
  try{
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  }catch(err){
    throw ("Could not serialize state")
  }
}
