
import ViewPRoductCompo from "../ViewPRoductCompo"


const page =  async ({params}) => {
    const {slug} = await params 


  return (
    <div>
      <ViewPRoductCompo slug={slug} />
      
    </div>
  )
}

export default page
