import Image from 'next/image';
import React from 'react';

function Header() {
  return (
    <header className="h-20 px-6 flex items-center justify-start bg-white shadow-md">
      <div className="flex items-center gap-3">
        <Image
          src="/logo.png"
          alt="LOGO"
          height={48}
          width={48}
          className="w-12 h-auto rounded-full drop-shadow-sm"
        />
        <h1 className="text-xl font-bold text-sky-700 tracking-tight">IntelliHire</h1>
      </div>
    </header>
  );
}

export default Header;
