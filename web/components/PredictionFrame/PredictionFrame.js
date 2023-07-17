import Image from "next/image";
import { Grid, Card, Title, Subtitle, Col } from "@tremor/react";

export default function PredictionFrame({ children, ...props }) {

    const data = props.data;
    console.log(data);

    return (
        <div className="flex flex-col gap-6 w-full">

            {/* If data.width > data.height print hola else print adios */}
            {data.width > data.height ? (
                <>
                    <Grid numItemsMd={2} className="mt-6 gap-6 w-full">
                        <Card>
                            <div className="" style={{ height: "50vh" }}>
                                <Image
                                    src="/images/jason_face.webp"
                                    alt="Analysis Original"
                                    fill
                                    objectFit="cover"
                                    className="rounded-md"
                                />
                            </div>
                        </Card>
                        <Card>
                            <div className="" style={{ height: "50vh" }}>
                                <Image
                                    src={`/prado/faces_hog/${data.face_path}`}
                                    alt="Analysis Found"
                                    fill
                                    objectFit="cover"
                                    className="rounded-md"
                                />
                            </div>
                        </Card>
                    </Grid>

                    <Card>
                        <div className="" style={{ height: "50vh" }}>
                            <div className="mt-4 absolute bottom-4 right-4 z-10 text-right">
                                <Title className="text-white">{data.title}</Title>
                                <Subtitle className="text-white italic">by <b>{data.author}</b></Subtitle>
                            </div>
                            <Image
                                src={`/prado/images/${data.picture_path}`}
                                alt="Analysis Found"
                                fill
                                objectFit="cover"
                                className="rounded-md"
                            />
                        </div>
                    </Card>
                </>
            ) : (
                <Grid numItemsLg={6} className="gap-6 mt-6">

                    <Col numColSpanLg={3}>
                        <Card className="h-full">
                            <div className="h-96" >
                                <div className="mt-4 absolute bottom-4 right-4 z-10 text-right">
                                    <Title className="text-white">{data.title}</Title>
                                    <Subtitle className="text-white italic">by <b>{data.author}</b></Subtitle>
                                </div>
                                <Image
                                    src={`/prado/images/${data.picture_path}`}
                                    alt="Analysis Found"
                                    fill
                                    objectFit="cover"
                                    className="rounded-md"
                                />
                            </div>
                        </Card>
                    </Col>

                    {/* KPI sidebar */}
                    <Col numColSpanLg={3}>
                        <div className="space-y-6">
                            <Card>
                                <div className="h-48">
                                    <Image
                                        src="/images/jason_face.webp"
                                        alt="Analysis Found"
                                        fill
                                        objectFit="cover"
                                        className="rounded-md"
                                    />
                                </div>
                            </Card>
                            <Card>
                                <div className="h-48">
                                    <Image
                                        src={`/prado/faces_hog/${data.face_path}`}
                                        alt="Analysis Original"
                                        fill
                                        objectFit="cover"
                                        className="rounded-md"
                                    />
                                </div>
                            </Card>
                        </div>
                    </Col>
                </Grid>
            )}

        </div>
    )
}