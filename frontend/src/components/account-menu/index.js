const AccountMenu = ({ activeUser }) => {
  return (
    <div className="aligned-right">
      {activeUser ? (
        <li>
          <a href="/">Search</a>
        </li>
      ) : (
        <>
          <li>
            <a href="/" className="premium-pass">
              Try Premium Plus
            </a>
          </li>
          <li>
            <a href="/">Log In</a>
          </li>
          <li>
            <a href="/">Search</a>
          </li>
        </>
      )}
    </div>
  );
};

export default AccountMenu;
