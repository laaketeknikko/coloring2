import { Button } from "primereact/button"

const classNames = "border-circle mr-1 ml-1"
const strongClassNames = "text-gray-700"
const MainHelp = () => {
   return (
      <div className="h-screen" style={{ maxWidth: "800px", margin: "auto" }}>
         <div className="bg-teal-100 border-round-3xl p-4 my-8">
            <p>
               <strong className={strongClassNames}>
                  Useless Simple Colorer
               </strong>{" "}
               is for quickly coloring outline images.
            </p>

            <div className="text-center">
               <h2>Usage</h2>
               <h3>1. Add files</h3>
               <p>
                  <Button className={classNames} icon="pi pi-upload" />

                  <Button
                     className={`${classNames} bg-green-100 border-0`}
                     icon="pi pi-arrow-right"
                     size="small"
                  />
                  <Button className={classNames} icon="pi pi-plus" />
                  <Button
                     className={`${classNames} bg-green-100 border-0`}
                     icon="pi pi-arrow-right"
                     size="small"
                  />
                  <Button className={classNames} icon="pi pi-upload" />
                  <Button
                     className={`${classNames} bg-green-100 border-0`}
                     icon="pi pi-arrow-right"
                     size="small"
                  />
                  <Button className={classNames} icon="pi pi-times" />
               </p>
               <h3>2. Adjust settings</h3>
               <p>
                  <Button className={classNames} icon="pi pi-cog" />
               </p>
               <h3>3. Run and wait</h3>
               <p>
                  <Button className={classNames} icon="pi pi-play" />
                  <Button
                     className={`${classNames} bg-green-100 border-0`}
                     icon="pi pi-arrow-right"
                     size="small"
                  />
                  <Button className={classNames} icon="pi pi-hourglass" />
               </p>
               <h3>4. Check results</h3>
               <p>
                  <Button className={classNames} icon="pi pi-palette" />
               </p>
            </div>

            <h2>Instructions</h2>

            <h3>Files</h3>
            <p>
               Supported file formats are{" "}
               <strong className={strongClassNames}>PNG</strong> and{" "}
               <strong className={strongClassNames}>JPG</strong>.
            </p>

            <h3>Main screen</h3>
            <p>
               <strong className={strongClassNames}>Queue uploaded</strong> and{" "}
               <strong className={strongClassNames}>Queue colored</strong> will
               add all the uploaded or colored images to the queue. Individual
               images can be added from the{" "}
               <strong className={strongClassNames}>uploaded images</strong> and{" "}
               <strong className={strongClassNames}>colored images</strong>{" "}
               tabs. <strong className={strongClassNames}>Queued images</strong>{" "}
               allows to remove images from the queue.
            </p>
            <p>
               <strong className={strongClassNames}>Play/Pause button</strong>{" "}
               acts as a toggle. While the toggle is running, any images queued
               will be processed immediately.
            </p>
            <p>
               Colored images can be{" "}
               <strong className={strongClassNames}>downloaded</strong> with
               <Button icon="pi pi-download" className="border-circle" />
            </p>

            <h3>Settings</h3>
            <h4>Outline color</h4>
            <p>
               Here you define the{" "}
               <strong className={strongClassNames}>
                  color of the outlines
               </strong>{" "}
               in your image as an{" "}
               <strong className={strongClassNames}>RGB</strong> value.
            </p>
            <p>
               <strong className={strongClassNames}>Tolerance</strong> is the
               color difference tolerance. Individual values can be input for
               each channel (red, green, blue). This value is then{" "}
               <strong className={strongClassNames}>added</strong> to and{" "}
               <strong className={strongClassNames}>subtracted</strong> from the
               specified outline color to create minimum and maximum boundaries.
               If the value of a pixel is within this range, it is considered an
               outline. Note that{" "}
               <strong className={strongClassNames}>
                  all the channel values
               </strong>{" "}
               must be within the range.
            </p>
            <p>
               <strong className={strongClassNames}>Margin</strong> is the
               number of pixels to leave between the outlines and the colored
               areas.
            </p>

            <h4>Shading mode</h4>
            <p>
               <strong className={strongClassNames}>No shading</strong> will
               color an area with an even, solid color.
            </p>
            <p>
               <strong className={strongClassNames}>Pixel lightness</strong>{" "}
               will apply the{" "}
               <strong className={strongClassNames}>lightness</strong> value of
               the pixel to the paint color. This will make darker pixels in an
               area have a darker variation of the paint color than lighter
               pixels. This might be useful if the image is{" "}
               <strong className={strongClassNames}>grayscale</strong> with
               shades.
            </p>

            <p>
               <strong className={strongClassNames}>Pixel transparency</strong>{" "}
               works in the same way as{" "}
               <strong className={strongClassNames}>pixel lightness</strong>,
               but instead of applying the lightness value of a pixel to the
               paint color, it applies the{" "}
               <strong className={strongClassNames}>
                  transparency of a pixel to the paint color
               </strong>
               . With this setting darker areas will have more opacity, while
               lighter areas will be more transparent.
            </p>

            <h4>Area mapping</h4>
            <p>
               <strong className={strongClassNames}>8-way</strong> will fill
               areas perfectly, but will be problematic if the outlines are only
               one pixel wide.
            </p>
            <p>
               <strong className={strongClassNames}>4-way orthogonal</strong>{" "}
               works better with pixelated outlines than 8-way, but some small
               nooks and crannies might be left uncolored.
            </p>
            <p>
               <strong className={strongClassNames}>4-way diagonal</strong>{" "}
               essentially results in every area being colored with two colors,
               with{" "}
               <strong className={strongClassNames}>every other pixel</strong>{" "}
               being in alternating colors.
            </p>

            <h4>Coloring by area size</h4>
            <p>
               This feature only works in combination with{" "}
               <strong className={strongClassNames}>custom colors</strong>. This
               allows to color areas that are larger than a threshold with a
               specific color.
            </p>
            <p>
               <strong className={strongClassNames}>Randomly</strong> disables
               this feature, and areas are colored with random colors. This{" "}
               <strong className={strongClassNames}>
                  does not use custom colors
               </strong>
               .
            </p>
            <p>
               With <strong className={strongClassNames}>size of area</strong>,
               area sizes are compared to the total size of all areas, and
               colored if (
               <strong className={strongClassNames}>
                  area size / total size
               </strong>
               ) is larger than the threshold defined in a custom color.
            </p>
            <p>
               When using{" "}
               <strong className={strongClassNames}>number of areas</strong>,
               areas are compared to the total number of areas, and colored if
               the area is
               <strong className={strongClassNames}>
                  larger than % of other areas
               </strong>{" "}
               defined in a custom color threshold.
            </p>

            <h3>Paint color settings</h3>
            <p>
               Select the desired color from the{" "}
               <strong className={strongClassNames}>color picker</strong>, then{" "}
               <strong className={strongClassNames}>add color</strong>. Colors
               will appear in a{" "}
               <strong className={strongClassNames}>scrollable list</strong>.
               Colors can be removed:{" "}
               <Button icon="pi pi-times" className={classNames} />
            </p>

            <p>
               The <strong className={strongClassNames}>textbox</strong> is used
               for the <strong className={strongClassNames}>threshold</strong>{" "}
               value in percents. It also accepts{" "}
               <strong className={strongClassNames}>fractional values</strong>.
               This is used{" "}
               <strong className={strongClassNames}>
                  only when coloring by size
               </strong>
               .
            </p>
            <p>
               By{" "}
               <strong className={strongClassNames}>clicking on a color</strong>{" "}
               you can select it and modify the color.
            </p>

            <h3>Viewing the images</h3>
            <p>
               <strong className={strongClassNames}>Uploaded images</strong>{" "}
               contains all the added images,{" "}
               <strong className={strongClassNames}>colored images</strong>{" "}
               contains all the processed images, and{" "}
               <strong className={strongClassNames}>queued images</strong>{" "}
               contains images that are waiting for processing.
            </p>
            <p>
               With <strong className={strongClassNames}>select all</strong> you
               can select or deselect all images. With{" "}
               <strong className={strongClassNames}>delete selected</strong> and{" "}
               <strong className={strongClassNames}>queue selected</strong> you
               can delete or queue the selected images. The selected{" "}
               <strong className={strongClassNames}>colored images</strong> and
               be downloaded with{" "}
               <strong className={strongClassNames}>download selected</strong>.
            </p>

            <h2>Tips</h2>
            <ul>
               <li>
                  <strong className={strongClassNames}>Outlines</strong> should
                  be in{" "}
                  <strong className={strongClassNames}>clear and strong</strong>{" "}
                  colors, such as black. This is especially important if you
                  wish to color grayscale images.
               </li>
               <li>Outlines should not have any holes.</li>
               <li>
                  Coloring by{" "}
                  <strong className={strongClassNames}>area size</strong> can be
                  used to color larger areas with more pleasant colors.
               </li>
               <li>
                  The{" "}
                  <strong className={strongClassNames}>pixel lightness</strong>{" "}
                  mode is essentially{" "}
                  <strong className={strongClassNames}>
                     adjusting color balance
                  </strong>
                  .
               </li>
            </ul>
         </div>
      </div>
   )
}

export { MainHelp }
