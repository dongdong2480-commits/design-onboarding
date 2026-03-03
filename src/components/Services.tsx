import { motion } from 'motion/react';
import { Check } from 'lucide-react';

const SERVICES = [
  {
    title: "Branding",
    description: "We build brands that stand out and connect with people.",
    features: ["Brand Strategy", "Visual Identity", "Logo Design", "Brand Guidelines"]
  },
  {
    title: "Digital Product",
    description: "We design and build digital products that solve real problems.",
    features: ["UX/UI Design", "Web Development", "Mobile Apps", "Design Systems"]
  },
  {
    title: "Marketing",
    description: "We help brands grow through data-driven marketing strategies.",
    features: ["SEO", "Content Strategy", "Social Media", "Campaigns"]
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          >
            Our Services
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
            className="text-xl text-gray-600 max-w-2xl"
          >
            We offer a comprehensive suite of services to help your business thrive in the digital age.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ delay: index * 0.15, duration: 0.8, ease: "easeOut" }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-8">{service.description}</p>
              <ul className="space-y-3">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm font-medium text-gray-800">
                    <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
