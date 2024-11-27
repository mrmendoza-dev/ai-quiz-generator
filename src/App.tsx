
import ApplicationShell from "@components/ApplicationShell/ApplicationShell";
import { ApplicationShellProvider } from "@contexts/ApplicationShellContext";
import { ToastProvider } from "@contexts/ToastContext";

function App() {
  return (
    <div className="App">
      <ApplicationShellProvider>
          <ToastProvider>
            <ApplicationShell />
          </ToastProvider>
      </ApplicationShellProvider>
    </div>
  );
}

export default App;
