import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Header() {
  return (
    <>
      <div className="flex h-20 items-center border-b border-black-60 mb-8 pl-4">
        <div className="flex border-solid border-2 rounded-lg border-black-600 justify-center items-center px-4 h-14">
        <Avatar className="mx-2">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="align-center mx-2">alex</p>
        </div>
      </div>
      
    </>
  );
}

export default Header;
