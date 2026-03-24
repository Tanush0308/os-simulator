/*class MemoryAllocator {
  constructor(sizes){this.blocks=sizes.map((size,id)=>({id,size,free:true,process:null}));}
  allocate(algo,name,size){let c=-1;if(algo==='FirstFit')c=this.blocks.findIndex(b=>b.free&&b.size>=size);else if(algo==='BestFit'){let best=Infinity;this.blocks.forEach((b,i)=>{if(b.free&&b.size>=size&&b.size-size<best){best=b.size-size;c=i;}});}else{let worst=-1;this.blocks.forEach((b,i)=>{if(b.free&&b.size>=size&&b.size>worst){worst=b.size;c=i;}});}if(c===-1)return{success:false,message:`No block found for ${size}KB`};const b=this.blocks[c];if(b.size>size+10){this.blocks.splice(c+1,0,{id:this.blocks.length,size:b.size-size,free:true,process:null});b.size=size;}b.free=false;b.process=name;return{success:true,message:`Allocated ${size}KB to ${name}`,blocks:this.blocks};}
  deallocate(name){const b=this.blocks.find(b=>b.process===name);if(!b)return{success:false,message:`${name} not found`};b.free=true;b.process=null;for(let i=0;i<this.blocks.length-1;i++)if(this.blocks[i].free&&this.blocks[i+1].free){this.blocks[i].size+=this.blocks[i+1].size;this.blocks.splice(i+1,1);i--;}return{success:true,message:`Freed ${name}`,blocks:this.blocks};}
}
module.exports = { MemoryAllocator }
*/


class MemoryAllocator {
  constructor(sizes) {
    this.blocks = sizes.map((size, id) => ({
      id,
      size,
      free: true,
      process: null
    }));
  }

  /**
   * Allocation Logic (First Fit, Best Fit, Worst Fit)
   */
  allocate(algo, name, size) {
    let c = -1;

    // Selection Strategy
    if (algo === 'FirstFit') {
      c = this.blocks.findIndex(b => b.free && b.size >= size);
    } else if (algo === 'BestFit') {
      let best = Infinity;
      this.blocks.forEach((b, i) => {
        if (b.free && b.size >= size && b.size - size < best) {
          best = b.size - size;
          c = i;
        }
      });
    } else {
      // Worst Fit
      let worst = -1;
      this.blocks.forEach((b, i) => {
        if (b.free && b.size >= size && b.size > worst) {
          worst = b.size;
          c = i;
        }
      });
    }

    // Allocation Result
    if (c === -1) {
      return { success: false, message: `No block found for ${size}KB` };
    }

    const b = this.blocks[c];

    // Splitting Logic (if remainder > 10KB)
    if (b.size > size + 10) {
      this.blocks.splice(c + 1, 0, {
        id: this.blocks.length,
        size: b.size - size,
        free: true,
        process: null
      });
      b.size = size;
    }

    b.free = false;
    b.process = name;

    return {
      success: true,
      message: `Allocated ${size}KB to ${name}`,
      blocks: this.blocks
    };
  }

  /**
   * Deallocation and Compaction (Coalescing)
   */
  deallocate(name) {
    const b = this.blocks.find(b => b.process === name);

    if (!b) {
      return { success: false, message: `${name} not found` };
    }

    // Free the block
    b.free = true;
    b.process = null;

    // Coalescing (Merging adjacent free blocks)
    for (let i = 0; i < this.blocks.length - 1; i++) {
      if (this.blocks[i].free && this.blocks[i + 1].free) {
        this.blocks[i].size += this.blocks[i + 1].size;
        this.blocks.splice(i + 1, 1);
        i--; // Re-check current index after merge
      }
    }

    return {
      success: true,
      message: `Freed ${name}`,
      blocks: this.blocks
    };
  }
}

module.exports = { MemoryAllocator };