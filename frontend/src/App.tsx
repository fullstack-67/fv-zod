import Nav from "./components/Nav";
import FormVanilla from "./components/form1";
import useStore from "./utils/store";

const [setOpen] = useStore((state) => [state.setOpen]);
// const { users } = useUsers(true);
function App() {
  return (
    <div className="container">
      <Nav />
      <FormVanilla />
    </div>
  );
}

export default App;
