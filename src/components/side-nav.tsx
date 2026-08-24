import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const navItems = [
  { href: '#shareable-list', label: 'Shareable List' },
  { href: '#percent-to-hex', label: 'Percent to Hex' },
  { href: '#ml-to-cups', label: 'Ml to Cups' },
  { href: '#pour-over', label: 'Pour Over' },
  { href: '#qr-code', label: 'QR Code' },
  { href: '#iframe-tester', label: 'Iframe Tester' },
  { href: '#generate-list', label: 'Generate List' },
  { href: '#base64-encoder', label: 'Base64 Encoder/Decoder' },
  { href: '#password-generator', label: 'Password Generator' },
  { href: '#timestamp-converter', label: 'Timestamp Converter' },
  { href: '#unix-permissions', label: 'Unix Permissions' },
  { href: '#color-contrast', label: 'Color Contrast Checker' },
  { href: '#px-to-rem', label: 'Px to Rem' },
  { href: '#lorem-ipsum-generator', label: 'Lorem Ipsum Generator' },
  { href: '#url-parser', label: 'URL Parser' },
  { href: '#word-counter', label: 'Word Counter' },
  { href: '#slug-generator', label: 'Slug Generator' },
];

const NavLinks = ({ onClick }: { onClick?: () => void }) => (
  <ul className="flex flex-col gap-1 list-none p-0 m-0">
    {navItems.map(({ href, label }) => (
      <li key={href}>
        <a
          href={href}
          onClick={onClick}
          className="block rounded-md px-3 py-2 text-sm text-foreground/80 no-underline transition-colors hover:bg-accent hover:text-foreground"
        >
          {label}
        </a>
      </li>
    ))}
  </ul>
);

const SideNav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  // Close on escape key
  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMobile();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen, closeMobile]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      {/* Mobile hamburger button — fixed at top-left */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation menu"
      >
        <Menu className="size-5" />
      </Button>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}

      {/* Mobile slide-out drawer */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-72 
          bg-background border-r border-border
          transform transition-transform duration-300 ease-in-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          md:hidden
          overflow-y-auto
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <span className="text-sm font-semibold text-foreground">Navigation</span>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={closeMobile}
            aria-label="Close navigation menu"
          >
            <X className="size-4" />
          </Button>
        </div>
        <nav className="p-3">
          <NavLinks onClick={closeMobile} />
        </nav>
      </aside>

      {/* Desktop sidebar */}
      <aside className="side-nav hidden md:block w-64 shrink-0 border-r border-border min-h-screen p-4 bg-muted/30">
        <nav>
          <NavLinks />
        </nav>
      </aside>
    </>
  );
};

export default SideNav;
