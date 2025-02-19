export default {
    link(router) {
        const confirmationMessage = "Are you sure you want to leave this page?";

        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = confirmationMessage;
            return confirmationMessage;
        };
        const handleClick = (e) => {
            e.preventDefault();
            const alert = confirm(
                "You may have some unsaved changes, Are you sure you want to proceed?"
            );
            console.log(e.target);
            if (alert) router.push(e.target.getAttribute("href"));

            // window.removeEventListener("beforeunload", handleBeforeUnload);
            // You may perform additional actions before redirecting
            // router.push(e.target.getAttribute("href"));
        };

        const links = document.querySelectorAll("a");

        links.forEach((link) => {
            link.addEventListener("click", handleClick);
        });

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            links.forEach((link) => {
                link.removeEventListener("click", handleClick);
            });
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    },
};
