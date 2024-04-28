import { MapPinned, Coffee, Award, BadgeCheck } from "lucide-react";
import { Separator } from "../../components/ui/separator";

export const ProductHighlights = () => {
    return (
        <>
            <Separator className="space-y-4 mt-4 mb-4" />

            <div className="space-y-4 md:p-16">
                <h2 className="text-2xl font-bold tracking-tight text-center">
                    Why Choose Us?
                </h2>

                <div className="grid grid-cols-2 gap-4 mt-4 p-4">
                    <div className="text-center px-4 sm:px-8 mb-8">
                        <div className="flex items-center justify-center">
                            <MapPinned size={24} />
                            <h3 className="font-bold ml-2">
                                Trusted Coffee Sources
                            </h3>
                        </div>
                        <p>
                            Originated from famous coffee regions in Vietnam
                            including CuM'gar - Dak Lak, Cau Dat - Lam Dong, Nam
                            Yang - Gia Lai, Khe Sanh - Quang Tri. We have nearly
                            30 years of coffee farming experience.
                        </p>
                    </div>
                    <div className="text-center px-4 sm:px-8">
                        <div className="flex items-center justify-center">
                            <Coffee size={24} />
                            <h3 className="font-bold ml-2">
                                Quality Coffee Harvests
                            </h3>
                        </div>
                        <p>
                            Only harvesting ripe coffee beans with a ripeness
                            rate of 99% is a prerequisite for coffee beans to
                            achieve maximum required qualities. Enhance the
                            flavor with high-quality coffee beans.
                        </p>
                    </div>
                    <div className="text-center px-4 sm:px-8">
                        <div className="flex items-center justify-center">
                            <Award size={24} />
                            <h3 className="font-bold ml-2">
                                Roasting Technology
                            </h3>
                        </div>
                        <p>
                            Roasting technology respects and exploits coffee
                            beans. The IMF roaster from Italy takes the coffee
                            roasting process to a new level.
                        </p>
                    </div>
                    <div className="text-center px-4 sm:px-8">
                        <div className="flex items-center justify-center">
                            <BadgeCheck size={24} />
                            <h3 className="font-bold ml-2">Quality Checked</h3>
                        </div>
                        <p>
                            Passion, dedication and making coffee from kindness.
                            Pure coffee (rustic & clean). We are committed to
                            100% no flavoring or chemicals for all coffee lines
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};
