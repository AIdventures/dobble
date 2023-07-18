import { Grid, Card, Title, Subtitle, Col } from "@tremor/react";
import ImageExpand from "../ImageExpand/ImageExpand";

export default function PredictionFrame({ children, ...props }) {

    const data = props.data;
    console.log(data);

    return (
        <div className="flex flex-col gap-6 w-full">

            {/* If data.width > data.height print hola else print adios */}
            {data.picture_width > data.picture_height ? (
                <>
                    <Grid numItemsMd={2} className="mt-6 gap-6 w-full">
                        <Card>
                            <div className="" style={{ height: "50vh" }}>
                                <ImageExpand
                                    src={`/tmp/dobble/${data.filename}`}
                                    alt="Analysis Found"
                                    width={data.image_width}
                                    height={data.image_height}
                                />
                            </div>
                        </Card>
                        <Card>
                            <div className="" style={{ height: "50vh" }}>
                                <ImageExpand
                                    src={`/prado/faces_hog/${data.face_path}`}
                                    alt="Analysis Found"
                                    width={data.face_width}
                                    height={data.face_height}
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
                            <ImageExpand
                                src={`/prado/images/${data.picture_path}`}
                                alt="Analysis Found"
                                width={data.picture_width}
                                height={data.picture_height}
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
                                <ImageExpand
                                    src={`/prado/images/${data.picture_path}`}
                                    alt="Analysis Found"
                                    width={data.picture_width}
                                    height={data.picture_height}
                                />
                            </div>
                        </Card>
                    </Col>

                    <Col numColSpanLg={3}>
                        <div className="space-y-6">
                            <Card>
                                <div className="h-48">
                                    <ImageExpand
                                        src={`/tmp/dobble/${data.filename}`}
                                        alt="Analysis Found"
                                        width={data.image_width}
                                        height={data.image_height}
                                    />
                                </div>
                            </Card>
                            <Card>
                                <div className="h-48">
                                    <ImageExpand
                                        src={`/prado/faces_hog/${data.face_path}`}
                                        alt="Analysis Original"
                                        width={data.face_width}
                                        height={data.face_height}
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