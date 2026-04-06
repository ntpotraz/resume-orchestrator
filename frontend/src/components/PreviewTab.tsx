const PreviewTab = () => {
  return (
    <div className="bg-red-300 flex-1">
      <ul className="list-disc">
        <li>Can I have the Builder type live on ResumeOrchestrator.tsx, then just pass it's fields to the correlating page and grab the data from there?</li>
        <li>Actually, since those components won't even be mounted,  I don't think they'll actually still have the data</li>
        <li>Probably need to create state on ResumeOrchestrator and just have it update with the items everytime they're refreshed</li>
        <li>Which means that when the app is booted up, it has to fetch all the data for ResumeOrchestrator, or else I'll have to visit each tab before all the data is loaded</li>
        <li>But I should only have to fetch that single time on app launch. I should be able to update that state whenever I go to the tab to edit the data</li>
        <li>Should create a type state, so I just have a singular state that I can maintain that can store all the data in the respectiv fields</li>
      </ul>
      
      
    </div>

  )
}

export default PreviewTab
