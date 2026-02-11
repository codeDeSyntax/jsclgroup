"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, ArrowLeft } from "lucide-react";

interface DivisionsHeaderProps {
  division: "real-estate" | "gadgets" | "travel";
  divisionTitle: string;
}

export default function DivisionsHeader({
  division,
  divisionTitle,
}: DivisionsHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation items based on division
  const getNavigationItems = () => {
    switch (division) {
      case "real-estate":
        return [
          { name: "Our Properties", href: "#properties" },
          { name: "Services", href: "#services" },
          { name: "About", href: "#about" },
          { name: "Contact", href: "#contact" },
        ];
      case "gadgets":
        return [
          { name: "Our Products", href: "#products" },
          { name: "Categories", href: "#categories" },
          { name: "About", href: "#about" },
          { name: "Contact", href: "#contact" },
        ];
      case "travel":
        return [
          { name: "Destinations", href: "#destinations" },
          { name: "Packages", href: "#packages" },
          { name: "About", href: "#about" },
          { name: "Contact", href: "#contact" },
        ];
      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <>
      <style jsx global>{`
        :root {
          --theme-palette-color-1: #2872fa;
          --theme-palette-color-2: #1559ed;
          --theme-palette-color-3: #3a4f66;
          --theme-palette-color-4: #192a3d;
          --theme-palette-color-5: #e1e8ed;
          --theme-palette-color-6: #f2f5f7;
          --theme-palette-color-7: #fafbfc;
          --theme-palette-color-8: #ffffff;
          --brand-orange: #f85506;
        }

        .ct-header {
          position: relative;
          z-index: 50;
        }

        .ct-sticky-container {
          position: sticky;
          top: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          border-bottom: 1px solid var(--theme-palette-color-5);
        }

        .ct-container {
          max-width: var(--theme-normal-container-max-width, 1290px);
          margin: 0 auto;
          padding: 0 var(--theme-container-edge-spacing, 2rem);
        }

        /* Boxed container - detached from edges */
        .ct-sticky-container[data-row="top:boxed"] {
          max-width: var(--theme-normal-container-max-width, 1290px);
          margin: 0 auto;
          border-radius: 0;
        }

        .ct-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--theme-palette-color-1);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          font-size: 0.875rem;
          text-decoration: none;
          transition: all 0.2s ease;
          border: none;
        }

        .ct-button:hover {
          background: var(--theme-palette-color-2);
          transform: translateY(-1px);
        }

        .ct-menu-link {
          color: var(--theme-palette-color-3);
          font-weight: 600;
          font-size: 0.875rem;
          text-decoration: none;
          padding: 0.5rem 1rem;
          transition: color 0.2s ease;
        }

        .ct-menu-link:hover {
          color: var(--theme-palette-color-1);
        }

        .ct-social-box a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          margin: 0 0.25rem;
          border-radius: 50%;
          transition: all 0.2s ease;
        }

        .ct-social-box a[data-network="whatsapp"] {
          background: #25d366;
          color: white;
        }

        .ct-social-box a[data-network="facebook"] {
          background: #1877f2;
          color: white;
        }

        .ct-social-box a[data-network="twitter"] {
          background: #1da1f2;
          color: white;
        }

        .ct-social-box a:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .ct-header-trigger {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: none;
          color: var(--theme-palette-color-3);
          font-weight: 600;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .ct-container {
            padding: 0 1rem;
          }
        }
      `}</style>

      {/* Desktop Header */}
      <header
        id="header"
        className="ct-header hidden md:block"
        data-id="type-1"
        itemScope
        itemType="https://schema.org/WPHeader"
      >
        <div data-device="desktop">
          <div className="ct-sticky-container" style={{ height: "85px" }}>
            <div data-sticky="yes:auto-hide">
              <div data-row="top:boxed" data-column-set="3">
                <div className="ct-container">
                  <div className="grid grid-cols-3 items-center h-full py-4">
                    {/* Start Column - Logo */}
                    <div data-column="start" data-placements="1">
                      <div data-items="primary">
                        <div
                          className="site-branding flex items-center gap-3"
                          data-id="logo"
                        >
                          <Link
                            href="/"
                            className="flex items-center gap-2 group"
                            rel="home"
                            itemProp="url"
                          >
                            <ArrowLeft
                              size={18}
                              className="text-gray-500 group-hover:text-var(--theme-palette-color-1) transition-colors"
                            />
                            <div className="w-10 h-10 bg-var(--theme-palette-color-1) rounded-lg flex items-center justify-center">
                              <span className="text-white font-bold text-lg tracking-tight">
                                JCL
                              </span>
                            </div>
                            <div className="text-left">
                              <div className="font-bold text-lg text-var(--theme-palette-color-4) leading-none tracking-tight">
                                JCL Group
                              </div>
                              <div
                                className="text-xs font-semibold uppercase tracking-wider"
                                style={{ color: "var(--brand-orange)" }}
                              >
                                {divisionTitle}
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Middle Column - Navigation */}
                    <div data-column="middle">
                      <div data-items="">
                        <nav
                          id="header-menu-1"
                          className="header-menu-1 menu-container flex justify-center"
                          data-id="menu"
                          data-interaction="hover"
                          data-menu="type-1"
                          data-responsive="yes"
                          itemScope
                          itemType="https://schema.org/SiteNavigationElement"
                        >
                          <ul
                            id="menu-primary-menu-1"
                            className="menu flex items-center space-x-6"
                          >
                            {navigationItems.map((item, index) => (
                              <li
                                key={item.name}
                                id={`menu-item-${200 + index}`}
                                className="menu-item menu-item-type-custom menu-item-object-custom"
                              >
                                <Link
                                  href={item.href}
                                  className="ct-menu-link"
                                  aria-current="page"
                                >
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </nav>
                      </div>
                    </div>

                    {/* End Column - CTA & Social */}
                    <div
                      data-column="end"
                      data-placements="1"
                      className="flex justify-end"
                    >
                      <div
                        data-items="primary"
                        className="flex items-center gap-4"
                      >
                        {/* CTA Button */}
                        <div className="ct-header-cta" data-id="button">
                          <Link
                            href="tel:+233556463076"
                            className="ct-button"
                            data-size="medium"
                            aria-label="Call Us Now"
                          >
                            <Phone size={16} />
                            Call Us Now
                          </Link>
                        </div>

                        {/* Social Icons */}
                        <div className="ct-header-socials" data-id="socials">
                          <div
                            className="ct-social-box"
                            data-color="custom"
                            data-icon-size="custom"
                            data-icons-type="simple"
                          >
                            <Link
                              href="https://api.whatsapp.com/send?phone=233556463076&text=Hello%2C%20I%20would%20like%20to%20speak%20with%20a%20JCL%20Group%20representative"
                              data-network="whatsapp"
                              aria-label="WhatsApp"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span className="ct-icon-container">
                                <svg
                                  width="20px"
                                  height="20px"
                                  viewBox="0 0 20 20"
                                  aria-hidden="true"
                                >
                                  <path d="M10,0C4.5,0,0,4.5,0,10c0,1.9,0.5,3.6,1.4,5.1L0.1,20l5-1.3C6.5,19.5,8.2,20,10,20c5.5,0,10-4.5,10-10S15.5,0,10,0zM6.6,5.3c0.2,0,0.3,0,0.5,0c0.2,0,0.4,0,0.6,0.4c0.2,0.5,0.7,1.7,0.8,1.8c0.1,0.1,0.1,0.3,0,0.4C8.3,8.2,8.3,8.3,8.1,8.5C8,8.6,7.9,8.8,7.8,8.9C7.7,9,7.5,9.1,7.7,9.4c0.1,0.2,0.6,1.1,1.4,1.7c0.9,0.8,1.7,1.1,2,1.2c0.2,0.1,0.4,0.1,0.5-0.1c0.1-0.2,0.6-0.7,0.8-1c0.2-0.2,0.3-0.2,0.6-0.1c0.2,0.1,1.4,0.7,1.7,0.8s0.4,0.2,0.5,0.3c0.1,0.1,0.1,0.6-0.1,1.2c-0.2,0.6-1.2,1.1-1.7,1.2c-0.5,0-0.9,0.2-3-0.6c-2.5-1-4.1-3.6-4.2-3.7c-0.1-0.2-1-1.3-1-2.6c0-1.2,0.6-1.8,0.9-2.1C6.1,5.4,6.4,5.3,6.6,5.3z"></path>
                                </svg>
                              </span>
                            </Link>

                            <Link
                              href="https://web.facebook.com/jclgroupgh"
                              data-network="facebook"
                              aria-label="Facebook"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span className="ct-icon-container">
                                <svg
                                  width="20px"
                                  height="20px"
                                  viewBox="0 0 20 20"
                                  aria-hidden="true"
                                >
                                  <path d="M20,10.1c0-5.5-4.5-10-10-10S0,4.5,0,10.1c0,5,3.7,9.1,8.4,9.9v-7H5.9v-2.9h2.5V7.9C8.4,5.4,9.9,4,12.2,4c1.1,0,2.2,0.2,2.2,0.2v2.5h-1.3c-1.2,0-1.6,0.8-1.6,1.6v1.9h2.8L13.9,13h-2.3v7C16.3,19.2,20,15.1,20,10.1z"></path>
                                </svg>
                              </span>
                            </Link>

                            <Link
                              href="https://x.com/jclgroupgh"
                              data-network="twitter"
                              aria-label="X (Twitter)"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span className="ct-icon-container">
                                <svg
                                  width="20px"
                                  height="20px"
                                  viewBox="0 0 20 20"
                                  aria-hidden="true"
                                >
                                  <path d="M2.9 0C1.3 0 0 1.3 0 2.9v14.3C0 18.7 1.3 20 2.9 20h14.3c1.6 0 2.9-1.3 2.9-2.9V2.9C20 1.3 18.7 0 17.1 0H2.9zm13.2 3.8L11.5 9l5.5 7.2h-4.3l-3.3-4.4-3.8 4.4H3.4l5-5.7-5.3-6.7h4.4l3 4 3.5-4h2.1zM14.4 15 6.8 5H5.6l7.7 10h1.1z"></path>
                                </svg>
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="ct-header md:hidden">
        <div data-device="mobile">
          <div className="ct-sticky-container" style={{ height: "81px" }}>
            <div data-sticky="auto-hide">
              <div data-row="middle:boxed" data-column-set="2">
                <div className="ct-container">
                  <div className="flex items-center justify-between h-full py-4">
                    {/* Logo */}
                    <div data-column="start" data-placements="1">
                      <div data-items="primary">
                        <div className="site-branding" data-id="logo">
                          <Link
                            href="/"
                            className="site-logo-container flex items-center gap-2"
                            rel="home"
                            itemProp="url"
                          >
                            <ArrowLeft size={16} className="text-gray-500" />
                            <div className="w-8 h-8 bg-var(--theme-palette-color-1) rounded-lg flex items-center justify-center">
                              <span className="text-white font-bold text-sm tracking-tight">
                                JCL
                              </span>
                            </div>
                            <div className="text-left">
                              <div className="font-bold text-sm text-var(--theme-palette-color-4) leading-none tracking-tight">
                                JCL Group
                              </div>
                              <div
                                className="text-xs font-semibold uppercase tracking-wider"
                                style={{ color: "var(--brand-orange)" }}
                              >
                                {divisionTitle}
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Hamburger Menu */}
                    <div data-column="end" data-placements="1">
                      <div data-items="primary">
                        <button
                          className="ct-header-trigger ct-toggle"
                          data-toggle-panel="#offcanvas"
                          aria-controls="offcanvas"
                          data-design="simple"
                          data-label="right"
                          aria-label="Menu"
                          data-id="trigger"
                          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                          <span className="ct-label hidden" aria-hidden="true">
                            Menu
                          </span>
                          <svg
                            className="ct-icon"
                            width="18"
                            height="14"
                            viewBox="0 0 18 14"
                            data-type="type-1"
                            aria-hidden="true"
                          >
                            <rect
                              y="0.00"
                              width="18"
                              height="1.7"
                              rx="1"
                            ></rect>
                            <rect
                              y="6.15"
                              width="18"
                              height="1.7"
                              rx="1"
                            ></rect>
                            <rect
                              y="12.3"
                              width="18"
                              height="1.7"
                              rx="1"
                            ></rect>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Off-Canvas Menu */}
      {mobileMenuOpen && (
        <div id="offcanvas" className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          <div className="absolute top-0 right-0 h-full w-80 bg-white shadow-2xl">
            <div className="p-6">
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-500 hover:text-var(--theme-palette-color-4)"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M18 6L6 18M6 6l12 12"
                      stroke="currentColor"
                      strokeWidth={2}
                    />
                  </svg>
                </button>
              </div>

              <nav className="space-y-4 mb-8">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block py-3 px-4 ct-menu-link rounded-lg hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              <div className="space-y-6">
                <Link
                  href="tel:+233556463076"
                  className="ct-button w-full justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Phone size={16} />
                  Call Us Now
                </Link>

                <div
                  className="ct-header-socials flex justify-center"
                  data-id="socials"
                >
                  <div className="ct-social-box">
                    <Link
                      href="https://api.whatsapp.com/send?phone=233556463076"
                      data-network="whatsapp"
                      aria-label="WhatsApp"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="ct-icon-container">
                        <svg
                          width="18px"
                          height="18px"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path d="M10,0C4.5,0,0,4.5,0,10c0,1.9,0.5,3.6,1.4,5.1L0.1,20l5-1.3C6.5,19.5,8.2,20,10,20c5.5,0,10-4.5,10-10S15.5,0,10,0zM6.6,5.3c0.2,0,0.3,0,0.5,0c0.2,0,0.4,0,0.6,0.4c0.2,0.5,0.7,1.7,0.8,1.8c0.1,0.1,0.1,0.3,0,0.4C8.3,8.2,8.3,8.3,8.1,8.5C8,8.6,7.9,8.8,7.8,8.9C7.7,9,7.5,9.1,7.7,9.4c0.1,0.2,0.6,1.1,1.4,1.7c0.9,0.8,1.7,1.1,2,1.2c0.2,0.1,0.4,0.1,0.5-0.1c0.1-0.2,0.6-0.7,0.8-1c0.2-0.2,0.3-0.2,0.6-0.1c0.2,0.1,1.4,0.7,1.7,0.8s0.4,0.2,0.5,0.3c0.1,0.1,0.1,0.6-0.1,1.2c-0.2,0.6-1.2,1.1-1.7,1.2c-0.5,0-0.9,0.2-3-0.6c-2.5-1-4.1-3.6-4.2-3.7c-0.1-0.2-1-1.3-1-2.6c0-1.2,0.6-1.8,0.9-2.1C6.1,5.4,6.4,5.3,6.6,5.3z"></path>
                        </svg>
                      </span>
                    </Link>

                    <Link
                      href="https://web.facebook.com/jclgroupgh"
                      data-network="facebook"
                      aria-label="Facebook"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="ct-icon-container">
                        <svg
                          width="18px"
                          height="18px"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path d="M20,10.1c0-5.5-4.5-10-10-10S0,4.5,0,10.1c0,5,3.7,9.1,8.4,9.9v-7H5.9v-2.9h2.5V7.9C8.4,5.4,9.9,4,12.2,4c1.1,0,2.2,0.2,2.2,0.2v2.5h-1.3c-1.2,0-1.6,0.8-1.6,1.6v1.9h2.8L13.9,13h-2.3v7C16.3,19.2,20,15.1,20,10.1z"></path>
                        </svg>
                      </span>
                    </Link>

                    <Link
                      href="https://x.com/jclgroupgh"
                      data-network="twitter"
                      aria-label="X (Twitter)"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="ct-icon-container">
                        <svg
                          width="18px"
                          height="18px"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path d="M2.9 0C1.3 0 0 1.3 0 2.9v14.3C0 18.7 1.3 20 2.9 20h14.3c1.6 0 2.9-1.3 2.9-2.9V2.9C20 1.3 18.7 0 17.1 0H2.9zm13.2 3.8L11.5 9l5.5 7.2h-4.3l-3.3-4.4-3.8 4.4H3.4l5-5.7-5.3-6.7h4.4l3 4 3.5-4h2.1zM14.4 15 6.8 5H5.6l7.7 10h1.1z"></path>
                        </svg>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
