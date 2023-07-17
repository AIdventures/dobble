import Image from "next/image";
import { Grid, Card, Title, BarChart, Subtitle } from "@tremor/react";
import Link from "next/link";


export default function Analysis() {

    const ethnicity_chart_data = [
        {
            name: "Caucasian",
            "Number of faces": 5237,
        },
        {
            name: "African",
            "Number of faces": 1191,
        },
        {
            name: "Asian",
            "Number of faces": 1129,
        },
        {
            name: "Hispanic",
            "Number of faces": 999,
        },
        {
            name: "Indian",
            "Number of faces": 122,
        }
    ];

    const age_chart_data = [
        {
            name: "0-9",
            "Number of faces": 614,
        },
        {
            name: "10-19",
            "Number of faces": 439,
        },
        {
            name: "20-29",
            "Number of faces": 4291,
        },
        {
            name: "30-39",
            "Number of faces": 1609,
        },
        {
            name: "40-49",
            "Number of faces": 915,
        },
        {
            name: "50-59",
            "Number of faces": 284,
        },
        {
            name: "60-69",
            "Number of faces": 372,
        },
        {
            name: ">70",
            "Number of faces": 154,
        },
    ];

    const gender_chart_data = [
        {
            name: "Female",
            "Number of faces": 6690,
        },
        {
            name: "Male",
            "Number of faces": 1988,
        }
    ];

    return (
        <div className="bg-white py-24">
            <div className="flex flex-col gap-6 items-center w-8/12 m-auto">
                <h1 className="text-black text-5xl"><b>Understanding</b> the results</h1>
                <p className="text-black text-xl">
                    A facial similarity detection model in artworks may not be entirely accurate due to the <b>biased data</b> available.
                    The data is influenced by the Museum and its artists, who predominantly depict individuals and situations from a homogenous geographical area.
                    This <b>limited diversity</b>, both ethnically and culturally, leads to a lack of representation in the dataset. We cannot observe consistent results regarding age and gender, as depicted in the following graphs, which highlight differences in these aspects.
                    This lack of representation leads to poor results when the face to match is <b>not properly represented</b> in the dataset.
                </p>

                <Grid numItemsMd={2} className="mt-6 gap-6">
                    <Card>
                        <Title>Number of faces by ethnicity</Title>
                        <Subtitle>
                            The number of faces by ethnicity, as the classes and possible biases and errors, are obtained from a <Link href="https://huggingface.co/cledoux42/Ethnicity_Test_v003" target="_blank" className="underline">Hugging Face model</Link>.
                        </Subtitle>
                        <BarChart
                            className="mt-6"
                            data={ethnicity_chart_data}
                            index="name"
                            categories={["Number of faces"]}
                            colors={["blue"]}
                            yAxisWidth={48}
                        />
                    </Card>
                    <Card>
                        <Title>Number of faces by gender</Title>
                        <Subtitle>
                            The number of faces by gender, as the classes and possible biases and errors, are obtained from a <Link href="https://huggingface.co/rizvandwiki/gender-classification-2" target="_blank" className="underline">Hugging Face model</Link>.
                        </Subtitle>
                        <BarChart
                            className="mt-6"
                            data={gender_chart_data}
                            index="name"
                            categories={["Number of faces"]}
                            colors={["blue"]}
                            yAxisWidth={48}
                        />underline
                    </Card>
                </Grid>

                <Card>
                    <Title>Number of faces by age</Title>
                    <Subtitle>
                        The number of faces by age, as the classes and possible biases and errors, are obtained from a <Link href="https://huggingface.co/nateraw/vit-age-classifier" target="_blank" className="underline">Hugging Face model</Link>.
                    </Subtitle>
                    <BarChart
                        className="mt-6"
                        data={age_chart_data}
                        index="name"
                        categories={["Number of faces"]}
                        colors={["blue"]}
                        yAxisWidth={48}
                        maxValue={4500}
                    />
                </Card>

                <Grid numItemsMd={2} className="mt-6 gap-6 w-full">
                    <Card>
                        <div className="" style={{ height: "50vh" }}>
                            <div className="mt-4 absolute bottom-4 right-4 z-10 text-right">
                                <Title className="text-white">Jason Momoa</Title>
                                <Subtitle className="text-white italic">Actor</Subtitle>
                            </div>
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
                            <div className="mt-4 absolute bottom-4 right-4 z-10 text-right">
                                <Title className="text-white">San Pedro</Title>
                                <Subtitle className="text-white italic">by <b>González de la Vega, Diego</b></Subtitle>
                            </div>
                            <Image
                                src="/images/san_pedro_face.webp"
                                alt="Analysis Found"
                                fill
                                objectFit="cover"
                                className="rounded-md"
                            />
                        </div>
                    </Card>
                </Grid>

            </div>
        </div>
    )
}