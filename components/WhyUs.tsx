import { whyUs } from "@/data/whyUs";
import {
  ShieldCheck,
  CheckCircle,
  Settings,
  Users,
} from "lucide-react";

const icons = {
  shield: ShieldCheck,
  check: CheckCircle,
  settings: Settings,
  users: Users,
};

export default function WhyUs() {
  return (
    <section className="bg-gray-200 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-gray-900 mb-12 text-center">
          ¿Por qué elegirnos?
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map((item, index) => {
            const Icon = icons[item.icon as keyof typeof icons];

            return (
              <div
                key={index}
                className="bg-white border border-gray-300 rounded-lg p-6 text-center flex flex-col gap-4"
              >
                <Icon className="mx-auto text-yellow-400 w-8 h-8" />
                <h3 className="font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
