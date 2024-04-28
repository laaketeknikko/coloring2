import { Button } from "primereact/button"
import { ScrollPanel } from "primereact/scrollpanel"
import { VirtualScroller } from "primereact/virtualscroller"

const classNames = "border-circle mr-1 ml-1"

const MainHelp = () => {
   return (
      <div className=" h-screen" style={{ maxWidth: "800px", margin: "auto" }}>
         <div className="bg-teal-100 border-round-3xl p-4">
            <p>
               Useless Simple Colorer is for quickly coloring outline images.
            </p>

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
            <h2>Instructions</h2>

            <h3>Files</h3>
            <p>
               Supported file formats are <strong>PNG</strong> and{" "}
               <strong>JPG</strong>.
            </p>

            <h3>Main screen</h3>
            <p>
               <strong>Queue uploaded</strong> and{" "}
               <strong>Queue colored</strong> will add all the uploaded or
               colored images to the queue. Individual images can be added from
               the <strong>uploaded images</strong> and{" "}
               <strong>colored images</strong> tabs.{" "}
               <strong>Queued images</strong> allows to remove images from the
               queue.
            </p>
            <p>
               <strong>Play/Pause button</strong> acts as a toggle. While the
               toggle is running, any images queued will be processed
               immediately.
            </p>
            <p>
               Colored images can be <strong>downloaded</strong> with
               <Button icon="pi pi-download" className="border-circle" />
            </p>

            <h3>Settings</h3>
            <h4>Outline color</h4>
            <p>
               Here you define the <strong>color of the outlines</strong> in
               your image as an <strong>RGB</strong> value.
            </p>
            <p>
               <strong>Tolerance</strong> is the color difference tolerance.
               Individual values can be input for each channel (red, green,
               blue). This value is then <strong>added</strong> to and{" "}
               <strong>subtracted</strong> from the specified outline color to
               create minimum and maximum boundaries. If the value of a pixel is
               within this range, it is considered an outline. Note that{" "}
               <strong>all the channel values</strong> must be within the range.
            </p>
            <p>
               <strong>Margin</strong> is the number of pixels to leave between
               the outlines and the colored areas.
            </p>

            <h4>Shading mode</h4>
            <p>
               <strong>No shading</strong> will color an area with an even,
               solid color.
            </p>
            <p>
               <strong>Pixel lightness</strong> will apply the{" "}
               <strong>lightness</strong> value of the pixel to the paint color.
               This will make darker pixels in an area have a darker variation
               of the paint color than lighter pixels. This might be useful if
               the image is <strong>grayscale</strong> with shades.
            </p>

            <p>
               <strong>Pixel transparency</strong> works in the same way as{" "}
               <strong>pixel lightness</strong>, but instead of applying the
               lightness value of a pixel to the paint color, it applies the{" "}
               <strong>transparency of a pixel to the paint color</strong>. With
               this setting darker areas will have more opacity, while lighter
               areas will be more transparent.
            </p>

            <h4>Area mapping</h4>
            <p>
               <strong>8-way</strong> will fill areas perfectly, but will be
               problematic if the outlines are only one pixel wide.
            </p>
            <p>
               <strong>4-way orthogonal</strong> works better with pixelated
               outlines than 8-way, but some small nooks and crannies might be
               left uncolored.
            </p>
            <p>
               <strong>4-way diagonal</strong> essentially results in every area
               being colored with two colors, with{" "}
               <strong>every other pixel</strong> being in alternating colors.
            </p>

            <h2>Tips</h2>
            <ul>
               <li>
                  Outlines should be in clear and strong colors, such as black.
                  This is especially important if you wish to color grayscale
                  images.
               </li>
               <li>Outlines should not have any holes.</li>
            </ul>
         </div>
      </div>
   )
}

export { MainHelp }
