"use client";
import "./Menu.css";
import { useRef, useState, useEffect } from "react";

import useCartStore from "@/store/useCartStore";

import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import { useTransitionRouter } from "next-view-transitions";

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", ".15, 1, .25, 1");

const Menu = () => {
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentPath, setCurrentPath] = useState("/");
  const cartCount = useCartStore((state) =>
    state.cartItems.reduce((count, item) => count + item.quantity, 0)
  );
  const router = useTransitionRouter();

  const toggleCart = useCartStore((state) => state.toggleCart);

  const menuRef = useRef(null);
  const menuTimeline = useRef(null);

  useEffect(() => () => menuTimeline.current?.kill(), []);
  const navRef = useRef(null);
  const menuOverlayRef = useRef(null);

  const navLogoRef = useRef(null);
  const menuBtnRef = useRef(null);
  const cartBtnRef = useRef(null);

  const overlayLogoRef = useRef(null);
  const closeBtnRef = useRef(null);

  const menuItemsRef = useRef(null);
  const menuFooterColsRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      if (typeof window !== "undefined") {
        setCurrentPath(window.location.pathname);
      }
    };

    window.addEventListener("popstate", handleRouteChange);

    router.events?.on?.("routeChangeComplete", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
      router.events?.off?.("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  useGSAP(
    () => {
      gsap.set(menuOverlayRef.current, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        pointerEvents: "none",
      });

      gsap.set([overlayLogoRef.current, closeBtnRef.current], {
        y: "100%",
      });

      gsap.set(".menu-overlay-items .revealer a", {
        y: "100%",
      });

      gsap.set(".menu-footer .revealer p, .menu-footer .revealer a", {
        y: "100%",
      });
    },
    { scope: menuRef }
  );

  function slideInOut() {
    document.documentElement.animate(
      [
        {
          opacity: 1,
          transform: "translateY(0)",
        },
        {
          opacity: 0.2,
          transform: "translateY(-35%)",
        },
      ],
      {
        duration: 600,
        easing: "cubic-bezier(0.87, 0, 0.13, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-old(root)",
      }
    );

    document.documentElement.animate(
      [
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        },
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        },
      ],
      {
        duration: 600,
        easing: "cubic-bezier(0.87, 0, 0.13, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }

  const getExactPath = () => {
    if (typeof window !== "undefined") {
      return window.location.pathname;
    }
    return currentPath;
  };

  const isExactPath = (path) => {
    const exactCurrentPath = getExactPath();
    return exactCurrentPath === path;
  };

  const navigateTo = (path) => {

    if (isExactPath(path)) {
      closeMenu();
      return;
    }

    closeMenu();

    router.push(path, {
      onTransitionReady: slideInOut,
    });
  };

  const openMenu = () => {
    if (isAnimating) return;
    ["/", "/info", "/catalogue", "/archive", "/editorial"].forEach((path) => router.prefetch(path));
    menuTimeline.current?.kill();
    setIsAnimating(true);
    const tl = gsap.timeline({ onComplete: () => setIsAnimating(false) });
    menuTimeline.current = tl;
    gsap.set(navRef.current, { pointerEvents: "none" });
    gsap.set(menuOverlayRef.current, { pointerEvents: "all" });
    tl.to(menuOverlayRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 0.4, ease: "power3.inOut",
    });
    tl.to([overlayLogoRef.current, closeBtnRef.current,
      ...menuRef.current.querySelectorAll(".menu-overlay-items .revealer a, .menu-footer .revealer p, .menu-footer .revealer a")], {
      y: "0%", duration: 0.3, stagger: 0.025, ease: "power3.out",
    }, 0.12);
  };

  const closeMenu = () => {
    menuTimeline.current?.kill();
    setIsAnimating(true);
    const tl = gsap.timeline({ onComplete: () => {
      setIsAnimating(false);
      gsap.set(menuOverlayRef.current, { pointerEvents: "none" });
      gsap.set(navRef.current, { pointerEvents: "all" });
      gsap.set([overlayLogoRef.current, closeBtnRef.current,
        ...menuRef.current.querySelectorAll(".menu-overlay-items .revealer a, .menu-footer .revealer p, .menu-footer .revealer a")], { y: "100%" });
    } });
    menuTimeline.current = tl;
    tl.to(menuOverlayRef.current, {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      duration: 0.35, ease: "power3.inOut",
    });
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    toggleCart();
  };

  return (
    <div className="menu" ref={menuRef}>
      <div className="nav" ref={navRef}>
        <div className="nav-logo">
          <div className="revealer">
            <a
              href="/"
              ref={navLogoRef}
              onClick={(e) => {
                e.preventDefault();
                if (isExactPath("/")) return;

                if (isCartOpen) {
                  setTimeout(() => {
                    router.push("/", {
                      onTransitionReady: slideInOut,
                    });
                  }, 500);
                } else {
                  router.push("/", {
                    onTransitionReady: slideInOut,
                  });
                }
              }}
            >
              Ostra
            </a>
          </div>
        </div>
        <div className="nav-items">
          <div className="nav-menu-toggle-open">
            <div className="revealer" onClick={openMenu}>
              <p ref={menuBtnRef}>Menu</p>
            </div>
          </div>
          <div className="nav-cart-btn">
            <div className="revealer" onClick={handleCartClick}>
              <p ref={cartBtnRef}>
                Cart (<span id="cart-count">{cartCount}</span>)
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="menu-overlay" ref={menuOverlayRef}>
        <div className="menu-overlay-nav">
          <div className="menu-overlay-nav-logo">
            <div className="revealer">
              <a
                href="/"
                ref={overlayLogoRef}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("/");
                }}
              >
                Ostra
              </a>
            </div>
          </div>
          <div className="menu-overlay-nav-toggle-close">
            <div className="revealer" onClick={closeMenu}>
              <p ref={closeBtnRef}>Close</p>
            </div>
          </div>
        </div>
        <div className="menu-overlay-items" ref={menuItemsRef}>
          <div className="revealer">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigateTo("/");
              }}
            >
              Index
            </a>
          </div>
          <div className="revealer">
            <a
              href="/catalogue"
              onClick={(e) => {
                e.preventDefault();
                navigateTo("/catalogue");
              }}
            >
              Catalogue
            </a>
          </div>
          <div className="revealer">
            <a
              href="/info"
              onClick={(e) => {
                e.preventDefault();
                navigateTo("/info");
              }}
            >
              Info
            </a>
          </div>
          <div className="revealer">
            <a
              href="/archive"
              onClick={(e) => {
                e.preventDefault();
                navigateTo("/archive");
              }}
            >
              Archive
            </a>
          </div>
          <div className="revealer">
            <a
              href="/editorial"
              onClick={(e) => {
                e.preventDefault();
                navigateTo("/editorial");
              }}
            >
              Editorial
            </a>
          </div>
        </div>
        <div className="menu-footer" ref={menuFooterColsRef}>
          <div className="menu-footer-col">
            <div className="revealer">
              <p>&copy;2026 All rights reserved</p>
            </div>
          </div>
          <div className="menu-footer-col">
            <div className="socials">
              <div className="revealer">
                <a href="/info" onClick={(event) => { event.preventDefault(); navigateTo("/info"); }}>Contact</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
