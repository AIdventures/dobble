import { randomUUID } from 'crypto'
import { existsSync, mkdirSync } from 'fs';
import { writeFile } from 'fs/promises'
import { NextResponse } from 'next/server'

var MAX_SIZE = 10 * 1024 * 1024; // 10 MB
var ALLOWED_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];

export async function POST(request) {
    const data = await request.formData()
    const file = data.get('file')

    if (!file) {
        return NextResponse.json({ success: false })
    }

    // Check if the file is too big (10 MB is the limit)
    if (file.size > MAX_SIZE) {
        return NextResponse.json({
            msg: 'File is too big. Max file size is 10MB'
        }, { status: 406 })
    }

    // Check if the file is an image file (png,jpg,jpeg)
    if (!ALLOWED_TYPES.includes(file.type)) {
        console.log('file is not an image')
        return NextResponse.json({
            msg: 'File is not a valid image file'
        }, { status: 406 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // generate a random unique filename, preverving the file extension
    const filename = `${randomUUID()}.${file.name.split('.').pop()}`

    // create the dir prado inside /tmp if it doesn't exist with fs
    if (!existsSync('/tmp/dobble')) { mkdirSync('/tmp/dobble')}

    // With the file data in the buffer, you can do whatever you want with it.
    // For this, we'll just write it to the filesystem in a new location
    const path = `/tmp/dobble/${filename}`
    await writeFile(path, buffer)
    console.log(`open ${path} to see the uploaded file`)

    return NextResponse.json({ filename: filename })
}
