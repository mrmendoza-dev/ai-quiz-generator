import ApplicationShell from "@/components/ApplicationShell/ApplicationShell";
import { ApplicationShellProvider } from "@/contexts/ApplicationShellContext";

function App() {
  return (
    <div className="App">
      <ApplicationShellProvider>
        <ApplicationShell />
      </ApplicationShellProvider>
    </div>
  );
}

export default App;
