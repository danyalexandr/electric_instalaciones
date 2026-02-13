import { whyUs } from "@/data/whyUs";
import {
  ShieldCheck,
  CheckCircle,
  Settings,
  Users,
  Award,
  TrendingUp,
} from "lucide-react";

const icons = {
  shield: ShieldCheck,
  check: CheckCircle,
  settings: Settings,
  users: Users,
};

export default function WhyUs() {
  return (
    <section className="bg-gradient-to-br from-slate-50 to-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            ¿Por qué elegirnos?
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Compromiso y calidad
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Más de 20 años de experiencia nos respaldan. Cada proyecto es una oportunidad de demostrar nuestro compromiso con la excelencia.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map((item, index) => {
            const Icon = icons[item.icon as keyof typeof icons];

            return (
              <div
                key={index}
                className="group bg-white border border-gray-200 rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-2xl mb-6 group-hover:bg-yellow-400 transition-colors duration-300">
                  <Icon className="w-8 h-8 text-yellow-600 group-hover:text-white transition-colors duration-300" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: Award, number: "20+", label: "Años de experiencia" },
            { icon: TrendingUp, number: "500+", label: "Proyectos realizados" },
            { icon: ShieldCheck, number: "100%", label: "Clientes satisfechos" },
            { icon: Users, number: "50+", label: "Profesionales" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-xl mb-4">
                <stat.icon className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
