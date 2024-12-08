import logo from '../../assets/images/logo.png';

const SidebarHeader = () => {
  return (
    <div className="pt-4 flex items-center justify-center">
      <img className="w-30 h-[60px] mx-auto" src={logo} alt="Logo" />
    </div>
  );
};

export default SidebarHeader;
