import Link from "next/link";
import React from "react";
import Logo from "@/components/elements/icons/Logo";
import ApiKeyMenu from "@/components/elements/inputs/ApiKeyMenu";

type Props = {
  apiKey: string;
  onApiKeyChange: (value: string) => void;
  remember: boolean;
  onRememberChange: (value: boolean) => void;
  keyPanelOpen: boolean;
  onKeyPanelOpenChange: (open: boolean) => void;
};

const DefaultHeader = ({
  apiKey,
  onApiKeyChange,
  remember,
  onRememberChange,
  keyPanelOpen,
  onKeyPanelOpenChange,
}: Props) => {
  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-(--breakpoint-xl) items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo />
          <span className="text-xl font-semibold tracking-tight text-gray-900">{`PropSpect`}</span>
        </Link>
        <ApiKeyMenu
          apiKey={apiKey}
          onApiKeyChange={onApiKeyChange}
          remember={remember}
          onRememberChange={onRememberChange}
          open={keyPanelOpen}
          onOpenChange={onKeyPanelOpenChange}
        />
      </nav>
    </header>
  );
};

export default DefaultHeader;
