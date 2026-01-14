type NavbarProps = {
  clickSummary: () => void;
  clickWork: () => void;
  clickProjects: () => void;
}

const Navbar = ({clickSummary, clickWork, clickProjects}: NavbarProps) => {
  return (
    <ul className="flex justify-evenly">
      <li className="flex-1 text-center bg-red-400 hover:bg-red-300 transition-colors duration-300 ease-out rounded-l-2xl">
        <button className="w-full py-4 " type="button" onClick={clickSummary}>Summary</button>
      </li>
      <li className="flex-1 text-center bg-red-400 hover:bg-red-300 transition-colors duration-300 ease-out">
        <button className="w-full py-4" type="button" onClick={clickWork}>Work Exp.</button>
      </li>
      <li className="flex-1 text-center bg-red-400 hover:bg-red-300 transition-colors duration-300 ease-out rounded-r-2xl">
        <button className="w-full py-4" type="button" onClick={clickProjects}>Projects</button>
      </li>
    </ul>
  );
};

export default Navbar;
