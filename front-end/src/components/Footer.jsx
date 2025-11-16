const Footer = () => {
    const linkSections = [
        {
            title: "Quick Links",
            links: ["Home", "Best Sellers", "Offers & Deals", "Contact Us", "FAQs"]
        },
        {
            title: "Support",
            links: ["Delivery Information", "Return & Refund Policy", "Payment Methods", "Track Your Order"]
        },
        {
            title: "Follow Us",
            links: ["Instagram", "Twitter", "Facebook", "YouTube"]
        }
    ];

    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-16 px-6 md:px-16 lg:px-24 xl:px-32 bg-gray-50 mt-10 border-t border-gray-300/30">
            <div className="flex flex-col md:flex-row items-start justify-between gap-12 py-10 text-gray-600">

                {/* Brand Section */}
                <div className="max-w-sm">
                    <h2 className="font-bold text-2xl md:text-3xl text-gray-900">Grocery App</h2>
                    <p className="text-sm md:text-base mt-3 leading-relaxed">
                        Fresh groceries delivered to your doorstep —  
                        quality you trust, convenience you love.
                    </p>
                </div>

                {/* Links Section */}
                <div className="flex flex-wrap justify-between w-full md:w-[50%] gap-8">
                    {linkSections.map((section, index) => (
                        <div key={index}>
                            <h3 className="font-semibold text-base text-gray-900 mb-3 md:mb-4">
                                {section.title}
                            </h3>
                            <ul className="text-sm space-y-2">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <a
                                            href="#"
                                            className="hover:text-gray-900 transition-colors"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Copy */}
            <p className="pt-6 text-center text-sm md:text-base text-gray-500">
                © {currentYear} Grocery App — All Rights Reserved.  
            </p>
        </footer>
    );
};

export default Footer;
