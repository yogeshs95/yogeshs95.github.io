/* =========================================================
   NESTED VERTICAL SCROLLBAR GUARD
========================================================= */

function removeNestedVerticalScrollbar() {

  const viewportWidth =
    window.innerWidth;


  const elements =
    document.querySelectorAll("*");


  elements.forEach(
    (element) => {

      /*
        Main document scrolling elements
        touch करायचे नाहीत.
      */

      if (
        element ===
          document.documentElement ||
        element ===
          document.body ||
        element.id ===
          "root"
      ) {
        return;
      }


      const style =
        window.getComputedStyle(
          element
        );


      const overflowY =
        style.overflowY;


      /*
        फक्त actual vertical scroll containers.
      */

      if (
        overflowY !== "scroll" &&
        overflowY !== "auto"
      ) {
        return;
      }


      if (
        element.scrollHeight <=
        element.clientHeight + 2
      ) {
        return;
      }


      const rect =
        element.getBoundingClientRect();


      /*
        Screenshot मधला scrollbar
        right edge वर आहे.
      */

      const touchesRightEdge =
        rect.right >=
        viewportWidth - 25;


      /*
        Header खाली सुरू होणारा
        nested container शोधतो.
      */

      const startsBelowTop =
        rect.top > 40;


      const largeEnough =
        rect.height > 250;


      if (
        touchesRightEdge &&
        startsBelowTop &&
        largeEnough
      ) {

        element.setAttribute(
          "data-nested-scroll-fixed",
          "true"
        );


        /*
          Nested vertical scrolling काढून
          scrolling main document कडे देतो.
        */

        element.style.setProperty(
          "overflow-y",
          "visible",
          "important"
        );


        element.style.setProperty(
          "scrollbar-width",
          "none",
          "important"
        );


        element.style.setProperty(
          "-ms-overflow-style",
          "none",
          "important"
        );

      }

    }
  );

}


/* =========================================================
   FIRST PAGE LOAD
========================================================= */

requestAnimationFrame(
  () => {

    removeNestedVerticalScrollbar();

  }
);


/* =========================================================
   SECOND PASS
   React / GSAP render झाल्यानंतर
========================================================= */

window.setTimeout(
  () => {

    removeNestedVerticalScrollbar();

  },
  300
);


window.setTimeout(
  () => {

    removeNestedVerticalScrollbar();

  },
  1000
);


/* =========================================================
   WINDOW RESIZE
========================================================= */

window.addEventListener(
  "resize",
  () => {

    removeNestedVerticalScrollbar();

  }
);


/* =========================================================
   DOM CHANGES
========================================================= */

const observer =
  new MutationObserver(
    () => {

      requestAnimationFrame(
        () => {

          removeNestedVerticalScrollbar();

        }
      );

    }
  );


observer.observe(
  document.documentElement,
  {
    childList: true,
    subtree: true,
  }
);